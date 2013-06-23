//height offset for iphone5
var CARDS_IPHONE5_OFFSET_HEIGHT = 50;
var cardImageTop = IPHONE5 ? 73+CARDS_IPHONE5_OFFSET_HEIGHT : 73;

var cardSelectionListContainer = null;

//Updates the UI after a purchase is completed
function updateUIAfterPurchase(){
	Ti.API.info('updateUIAfterPurchase() called');
	purchasedPack = true;
	
	cardSrollableView.opacity = 0;
	
	//recreate the scrollable list so that the purchased cards are visible
	var cardViews = createCardViews();
	cardSrollableView.setViews(cardViews);
	
	createCardSelectionList(true);
}

//Evenet handler for the restore purchases button
function handleRestorePurchases(){
	if(Titanium.Network.online == true){
		restorePurchases();
	} else {
		alert(MSG_NO_INTERNET);	
	}
}

//Event handler for the purchase product button
function handleProductPurchase(){
	if(Titanium.Network.online == true){
		
		var productObject = requestProduct(kidProduct, function(product){
			var productTitle = product.title;
			var productPrice = product.formattedPrice;
	
			purchaseProduct(product);
		});
		
	} else {
		alert(MSG_NO_INTERNET);
	}
}

//Creates the card that acts as a store (e.g. buy more)
function createStoreCard(){
	var storeCardView = Ti.UI.createView({
		top:isIpad ? 60 : IPHONE5? 42 : 30
	});
	
	var storeCard = Ti.UI.createImageView({
		image:IMAGE_PATH+'card/store/card_buymore.png',
	});
	
	var imgRestore = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/store/cloud_restore.png',
		left:isIpad ? 155 : 50,
		bottom:isIpad ? 40 : IPHONE5? 50 : 20,
		zIndex:2,
		width:isIpad? 223 :106,
		height:isIpad? 146: 70
	});
	
	var imgBuy = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/store/cloud_price.png',
		right:isIpad ? 155 : 50,
		bottom:isIpad ? 40 : IPHONE5? 50 : 20,
		zIndex:2,
		width:isIpad? 223 :106,
		height:isIpad? 146: 70
	});
	
	storeCardView.add(imgRestore);
	storeCardView.add(imgBuy);
	storeCardView.add(storeCard);
	
	imgRestore.addEventListener('click', handleRestorePurchases);
	imgBuy.addEventListener('click', handleProductPurchase);
	
	return storeCardView;
}

/*Returns an array with the image views for all the cards available to the app.
 Checks if any purchases have been made and performs accordingly*/
function createCardViews(){
	var cardViews = [];
	var tmpCard = null;
	var tmpCardContainer = null;
	var tmpCardIndexLabel = null;
	var homeButton = null;
	
	//create arrow images
	/*
	var cardArrowRight = Ti.UI.createImageView({
		image:IMAGE_PATH+'card/arrow-right.png',
		right:2,
		zIndex:10
	});*/
	
	//If there are no purchases, just add the demo cards
	if(!purchasedPack){
		for(var i=1; i <= 10; i++){
			
			tmpCard = Ti.UI.createImageView({
				image:IMAGE_PATH+'card/demo/demo'+i+'.png',
				top:isIpad ? 155 : cardImageTop
			});
			
			cardViews.push(tmpCard);
		}
		
		//Also add the STORE card
		cardViews.push(createStoreCard());
		
	} else {
		
		//create demo cards
		for(var i=1; i <= 10; i++){
			
			tmpCard = Ti.UI.createImageView({
				image:IMAGE_PATH+'card/demo/demo'+i+'.png',
				top:isIpad ? 155 : cardImageTop
			});
			
			cardViews.push(tmpCard);
		}
		
		//create cards for PACK1
		for(var i=1; i <= 100; i++){
			tmpCard = Ti.UI.createImageView({
				image:IMAGE_PATH+'card/pack1_gr/'+i+'.png',
				top:isIpad ? 155 : cardImageTop
			});
			
			cardViews.push(tmpCard);
		}
	}
	
	return cardViews;
}

/*Creates the card selection (1-10, 11-20 etc) - available only after purchases are made*/
function createCardSelectionList(afterPurchase){
	var CARD_SELECTION_OFFSET_X = isIpad? 176: IPHONE5? 98 : 79;
	var CARD_SELECTION_OFFSET_Y = isIpad? 228 : 105;
	var LIST_TOP = isIpad? 150 : IPHONE5? 60 : 70;
	
	cardSelectionListContainer = Ti.UI.createView({
		top:LIST_TOP,
		opacity:0
	});
	
	if(!IPHONE5){
		var cardListButton1 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/demo.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 3,
			top:5,
			cardIndex:1
		});
	
		var cardListButton2 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/1-10.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
			top:5,
			cardIndex:11
		});
		
		var cardListButton3 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/11-20.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
			top:5,
			cardIndex:21
		});
	
		var cardListButton4 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/21-30.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton3.left+CARD_SELECTION_OFFSET_X,
			top:5,
			cardIndex:31
		});
		
		//row2
		var cardListButton5 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/31-40.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 3,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:41
		});
		
		var cardListButton6 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/41-50.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:51
		});
		
		var cardListButton7 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/51-60.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:61
		});
		
		var cardListButton8 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/61-70.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton3.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:71
		});
	
		//row3
		var cardListButton9 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/71-80.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 3,
			top:cardListButton5.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:81
		});
		
		var cardListButton10 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/81-90.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton5.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:91
		});
		
		var cardListButton11 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/91-100.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton5.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:101
		});
		
		var cardListButton12 = Ti.UI.createImageView({
			image:IMAGE_PATH+'card/selection/more-soon.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton3.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton5.top+CARD_SELECTION_OFFSET_Y
		});
	} else {
		
		//row1
		var cardListButton1 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/demo.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 24,
			top:5,
			cardIndex:1
		});
	
		var cardListButton2 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/1-10.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
			top:5,
			cardIndex:11
		});
		
		var cardListButton3 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/11-20.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
			top:5,
			cardIndex:21
		});
		
		//iphone5 row2
		var cardListButton4 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/21-30.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 24,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:31
		});
	
		var cardListButton5 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/31-40.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton4.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:41
		});
		
		var cardListButton6 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/41-50.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton5.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:51
		});
	
		//iphone5 row3
		var cardListButton7 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/51-60.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 24,
			top:cardListButton4.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:61
		});
		
		var cardListButton8 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/61-70.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton7.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton4.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:71
		});
		
		var cardListButton9 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/71-80.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton8.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton4.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:81
		});
	
		//row4
		var cardListButton10 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/81-90.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:isIpad? 30 : 24,
			top:cardListButton7.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:91
		});
		
		var cardListButton11 = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'card/selection/91-100.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton10.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton7.top+CARD_SELECTION_OFFSET_Y,
			cardIndex:101
		});
		
		var cardListButton12 = Ti.UI.createImageView({
			image:IMAGE_PATH+'card/selection/more-soon.png',
			width:isIpad? 175 : 78,
			height:isIpad? 223 : 100,
			left:cardListButton11.left+CARD_SELECTION_OFFSET_X,
			top:cardListButton7.top+CARD_SELECTION_OFFSET_Y
		});
		
	}
	
	
	
	cardSelectionListContainer.add(cardListButton1);
	cardSelectionListContainer.add(cardListButton2);
	cardSelectionListContainer.add(cardListButton3);
	cardSelectionListContainer.add(cardListButton4);
	cardSelectionListContainer.add(cardListButton5);
	cardSelectionListContainer.add(cardListButton6);
	cardSelectionListContainer.add(cardListButton7);
	cardSelectionListContainer.add(cardListButton8);
	cardSelectionListContainer.add(cardListButton9);
	cardSelectionListContainer.add(cardListButton10);
	cardSelectionListContainer.add(cardListButton11);
	cardSelectionListContainer.add(cardListButton12);
	
	cardListButton1.addEventListener('click', handleCardSelection);
	cardListButton2.addEventListener('click', handleCardSelection);
	cardListButton3.addEventListener('click', handleCardSelection);
	cardListButton4.addEventListener('click', handleCardSelection);
	cardListButton5.addEventListener('click', handleCardSelection);
	cardListButton6.addEventListener('click', handleCardSelection);
	cardListButton7.addEventListener('click', handleCardSelection);
	cardListButton8.addEventListener('click', handleCardSelection);
	cardListButton9.addEventListener('click', handleCardSelection);
	cardListButton10.addEventListener('click', handleCardSelection);
	cardListButton11.addEventListener('click', handleCardSelection);
	cardListButton12.addEventListener('click', handleCardSelection);
	
	viewCards.add(cardSelectionListContainer);
	if(afterPurchase){
		cardSelectionListContainer.animate(anim_in);
	} else {
		cardSelectionListContainer.opacity = 1;
	}
}

//Event handler for the cards scroll event
function handleCardScroll(e){
	Ti.API.info('SCROLL EVENT, purchasedPack='+purchasedPack);
	
	var cardIndex = (e.currentPage+1);
	
	if(cardIndex <= 10){
		cardIndexLabel.hide();
	} else {
		
		if(purchasedPack){
			cardIndexLabel.show();
		}
		
	}
	
	//subtract the demo cards to align the numbering
	cardIndex -= 10;
	cardIndexLabel.text = cardIndex;
}

//Event handler for selecting a card from the listing
function handleCardSelection(e){
	var scrollToIndex = e.source.cardIndex;
	if(scrollToIndex != null){
		
		scrollToIndex = scrollToIndex - 1;
		cardSrollableView.setCurrentPage(scrollToIndex);
		
		//Show/hide the card indicator
		if(scrollToIndex < 10){
			cardIndexLabel.hide();
		} else {
			//subtract the demo cards to align the numbering
			var cardIndex = (scrollToIndex+1) -10;
			cardIndexLabel.text = cardIndex;
			
			if(purchasedPack){
				cardIndexLabel.show();
			}
		}
	
		//show the home button
		cardHomeButton.show();
		
		//show the cards
		cardSelectionListContainer.opacity = 0;
		cardSrollableView.animate(anim_in);
	}
}

//Event handler for the card home button
function handleCardHomeButton(){
	cardHomeButton.hide();
	cardIndexLabel.hide();
	
	cardSrollableView.opacity = 0;
	cardSelectionListContainer.animate(anim_in);
}

//cards view
var viewCards = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'card/background_B.jpg',
	bottom:isIpad ? 146 : 65,
	opacity:0
});

win.add(viewCards);

//title popup
var titleCardPopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/title_card.png',
	top:0
});

viewCards.add(titleCardPopup);

//title label in the popup
var titleCardLabel = Ti.UI.createLabel({
	text:CARDS_TITLE,
	color:'3bb3e6',
	textAlign:'center',
	width:isIpad ? 350 : 150,
	left:isIpad ? 75 : 28,  
	top:isIpad ? 10 : 2,
	font:{fontSize:isIpad ? 70 : 29, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleCardPopup.add(titleCardLabel);

//Cards scrollable view
var cardSrollableView = Ti.UI.createScrollableView({
	showPagingControl:false,
	opacity:0
});

//Card index label
var cardIndexLabel = Ti.UI.createLabel({
	color:'77d040',
	text:'1',
	font:{fontSize:isIpad ? 68 : 27, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'},
	zIndex:20,
	right:isIpad ? 16:8,
	top:5,
	visible:false
});

//Card home button
var cardHomeButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'card/home.png',
	width:isIpad? 132:58,
	height:isIpad? 122:54,
	visible:false,
	top:0,
	left:0,
	zIndex:20,
});

//Build cards and scrollable view
var cardViews = createCardViews();
cardSrollableView.setViews(cardViews);

//Add the scrollable list
viewCards.add(cardSrollableView);

viewCards.add(cardIndexLabel);
viewCards.add(cardHomeButton);

//Add event listeners
cardSrollableView.addEventListener('scrollend', handleCardScroll);
cardHomeButton.addEventListener('click', handleCardHomeButton);

//Show tha card selection list, if any purchases have been made
if(purchasedPack){
	createCardSelectionList(false);
} else {
	cardSrollableView.opacity = 1;
}

