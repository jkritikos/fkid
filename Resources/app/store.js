var Storekit = require('ti.storekit');

//Generic store properties
Storekit.receiptVerificationSandbox = (Ti.App.deployType !== 'production');
Storekit.receiptVerificationSharedSecret = "e50e734a9ccc4480b2444d63ce69bcac";
var verifyingReceipts = false;

/*
 Now let's define a couple utility functions. We'll use these throughout the app.
 */
var tempPurchasedStore = {};


//Check for existing purchases
var kidProduct = "PACK1_GR";
var purchasedPack = checkIfProductPurchased(kidProduct);
Ti.API.info('STORE: isProductPurchased='+purchasedPack);

function showLoading(){
	Ti.API.info('STORE: showLoading()');
}

function hideLoading(){
	Ti.API.info('STORE: hideLoading()');
}

/**
 * Keeps track (internally) of purchased products.
 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
 */
function markProductAsPurchased(identifier)
{
	Ti.API.info('STORE: Marking as purchased: ' + identifier);
	// Store it in an object for immediate retrieval.
	tempPurchasedStore[identifier] = true;
	// And in to Ti.App.Properties for persistent storage.
	Ti.App.Properties.setBool('Purchased-' + identifier, true);
}

/**
 * Checks if a product has been purchased in the past, based on our internal memory.
 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
 */
function checkIfProductPurchased(identifier)
{
	Ti.API.info('STORE: Checking if purchased: ' + identifier);
	if (tempPurchasedStore[identifier] === undefined)
		tempPurchasedStore[identifier] = Ti.App.Properties.getBool('Purchased-' + identifier, false);
	return tempPurchasedStore[identifier];
}

/**
 * Requests a product. Use this to get the information you have set up in iTunesConnect, like the localized name and
 * price for the current user.
 * @param identifier The identifier of the product, as specified in iTunesConnect.
 * @param success A callback function.
 * @return A Ti.Storekit.Product.
 */
function requestProduct(identifier, success)
{
	showLoading();
	Storekit.requestProducts([identifier], function (evt) {
		hideLoading();
		if (!evt.success) {
			alert(STORE_ERROR_COMMS);
		}
		else if (evt.invalid) {
			alert(STORE_ERROR_INVALID_PRODUCT);
		}
		else {
			success(evt.products[0]);
		}
	});
}

/**
 * Purchases a product.
 * @param product A Ti.Storekit.Product (hint: use Storekit.requestProducts to get one of these!).
 */
Storekit.addEventListener('transactionState', function (evt) {
	hideLoading();
	switch (evt.state) {
		case Storekit.FAILED:
			if (evt.cancelled) {
				alert(STORE_MSG_PURCHASE_CANCELLED);
			} else {
				alert(STORE_ERROR_GENERAL_FAILURE + evt.message);
			}
			break;
		case Storekit.PURCHASED:
			if (verifyingReceipts) {
				Storekit.verifyReceipt(evt, function (e) {
					if (e.success) {
						if (e.valid) {
							alert('Thanks! Receipt Verified');
							markProductAsPurchased(evt.productIdentifier);
						} else {
							alert('Sorry. Receipt is invalid');
						}
					} else {
						alert(e.message);
					}
				});
			} else {
				alert(STORE_MSG_THANKS_FOR_PURCHASE);
				
				//Update UI with new content
				updateUIAfterPurchase();
				
				markProductAsPurchased(evt.productIdentifier);
			}
			break;
		case Storekit.PURCHASING:
			Ti.API.info("STORE: Purchasing " + evt.productIdentifier);
			break;
		case Storekit.RESTORED:
			// The complete list of restored products is sent with the `restoredCompletedTransactions` event
			Ti.API.info("STORE: Restored " + evt.productIdentifier);
		    break;
	}
});

function purchaseProduct(product)
{
	showLoading();
	Storekit.purchase(product);
}

/**
 * Restores any purchases that the current user has made in the past, but we have lost memory of.
 */
function restorePurchases()
{
	showLoading();
	Storekit.restoreCompletedTransactions();
}

Storekit.addEventListener('restoredCompletedTransactions', function (evt) {
	hideLoading();
	if (evt.error) {
		alert(evt.error);
	}
	else if (evt.transactions == null || evt.transactions.length == 0) {
		alert(STORE_MSG_NOTHING_TO_RESTORE);
	}
	else {
		for (var i = 0; i < evt.transactions.length; i++) {
			if (verifyingReceipts) {
				Storekit.verifyReceipt(evt.transactions[i], function (e) {
					if (e.valid) {
						markProductAsPurchased(e.productIdentifier);
					} else {
						Ti.API.error("STORE: Restored transaction is not valid");
					}
				});
			} else {
				markProductAsPurchased(evt.transactions[i].productIdentifier);
			}
		}
		alert('Εγκαταστάθηκε ' + evt.transactions.length + ' αγορά!');
		
		//Update UI with new content
		updateUIAfterPurchase();
	}
});