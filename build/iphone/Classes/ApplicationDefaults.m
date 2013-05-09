/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"1osyTA3TxuwW3VazT0eRJPiJ7NzVhdmS"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"3Sxr6P7fjJkxziqSR4h7t54I3DTSN8vq"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"ZyYTX3kzImwFVh7vX340HILUoGd6FUmm"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"07FSMKefUjnl3tAxXoTmWWoB6XkDrmrZ"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"tNDSd1EUI6CyLbC3YM72THNUZwJQVdT5"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"vpXsJRdIu7p13cxgejOFQVPQSeBw7BaB"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
