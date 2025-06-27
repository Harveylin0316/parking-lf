CMS相關資料
https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allCMSavailable.xml

剩餘停車位數V2
https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json

臺北市停車場資訊V2
https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json

主要欄位說明
靜態資料:UpdateTime：靜態資料更新時間、ID：停車場的編號、AREA：行政區、NAME：停車場名稱、TYPE: 1:動態停車場(可取得目前剩餘車位數) 2:靜態停車場、TYPE2: 1:停管處經營 2:非停管處經營、SUMMARY：停車場概況、ADDRESS：停車場地址、TEL：停車場電話、PAYEX：停車場收費資訊、TOTALCAR：停車場（汽車）總車位數、TOTALMOTOR：停車場（機車）總格位數、TOTALBIKE：停車場（腳踏車）總車架數、TOTALBUS：停車場（大客車）總車位數、StationName：充電站名稱、StationAddr：充電站地址、locLongitude：充電站經度、locLatitude：充電站緯度、openFlag：充電站是否對外開放、isCharge：充電站是否收費、contactName：充電站聯絡人姓名、contactMobilNo：充電站聯絡人電話、scoketCount：該站充電座數、availableCount：該站目前可用充電數、country：充電站所在地的鎮市區、town：充電站所在地的縣市、Pregnancy_First：孕婦優先車格位數、Handicap_First：身障車格位數、TOTALLARGEMOTOR：重機停車位數、ChargingStation：充電站數、SERVICETIME:開放時間、TW97X:TWD97 X座標值、TW97Y: TWD97 Y座標值、FareInfo：費率資訊、WorkingDay：一般日、Period：某時段（例如：00～09表示凌晨0時至上午9時）、Fare：一般費率、Holiday：假日、 Period：某時段、 Fare：假日費率、Entrancecoord：入口座標資訊、EntrancecoordInfo：某一入口、 Xcod：WGS X座標值（經度）、 Ycod：WGS Y座標值（緯度）、Addresss：地址、 動態資料:、UpdateTime：動態資料更新時間、PARK：某一停車場的資料、ID：停車場的編號、AVAILABLECAR：停車場（汽車）目前之剩餘車位數，要是數值等於-9，表示本停車場目前無法提供即時車位數資訊（若為-13、-12、-11表示雖無格數，但可以顯示滿車率，-11：剩餘格位足夠、-12：剩餘格位不足半數、-13：剩餘格數不足）。、AVAILABLEMOTOR：停車場（機車）目前之剩餘格位數，要是數值等於-9，表示本停車場目前無法提供即時格位數資訊（若為-13、-12、-11表示雖無格數，但可以顯示滿車率，-11：剩餘格位足夠、-12：剩餘格位不足半數、-13：剩餘格數不足）。、AVAILABLEBUS：停車場（大客車）目前之剩餘車位數，要是數值等於-9，表示本停車場目前無法提供即時車位數資訊（若為-13、-12、-11表示雖無格數，但可以顯示滿車率，-11：剩餘格位足夠、-12：剩餘格位不足半數、-13：剩餘格數不足）。、ALT_PAK1：依由近而遠之距離提供滿場替代停車場ID編號、ALT_PAK2：依由近而遠之距離提供滿場替代停車場ID編號、ALT_PAK3：依由近而遠之距離提供滿場替代停車場ID編號、scoketStatusList：充電座狀態集、spot_abrv：充電座編號、spot_status：充電座狀態