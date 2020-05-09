const {Builder, until, By, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
    

async function runDummyUser() {
  let driver;
  try{
    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options()
        .addArguments(
          '--use-fake-ui-for-media-stream', 
          '--use-fake-device-for-media-stream',
          '--disable-translate'
          )
        .headless()
        )
      .build();
    // open n+1 tabs
    await await driver.get('https://195aed9f.ngrok.io');
    for( let i = 0; i < 9; i++){
      await driver.executeScript("window.open('https://195aed9f.ngrok.io')");
    }
    const handles = await driver.getAllWindowHandles();
    console.log(handles);
    for(let tab of handles){
      await driver.switchTo().window(tab);
      let mediaButton = await driver.wait(until.elementLocated(By.id("get_media_button")),10000);
      mediaButton.click();
      let nameButton = await driver.wait(until.elementLocated(By.id("name_button")),10000);
      nameButton = await driver.wait(until.elementIsVisible(nameButton),1000);
      nameButton.click();
      await driver.sleep(100);
    }
    console.log('no erros yet');
    // 4 directions and 'alt' for a non movement one 
    const actions = [Key.ENTER, Key.ARROW_LEFT, Key.ARROW_DOWN, Key.ARROW_UP, Key.ARROW_RIGHT];
    const map = {};
    while(true){
      const handles = await driver.getAllWindowHandles();
      for(let tab of handles){
        await driver.switchTo().window(tab);
        if(map[tab]){
          await driver.actions().keyUp(actions[map[tab]]).perform();
        }
        const direction = Math.floor(Math.random()* 5);
        map[tab] = direction;
        await driver.actions().keyDown(actions[map[tab]]).perform();
      }
      await driver.sleep(509);
    }
  }catch(error){
    console.log(error);
    await driver.close();
  }
}

runDummyUser();
