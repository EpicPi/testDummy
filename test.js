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
    await await driver.get('https://test.gatherly.io');
    let mediaButton = await driver.wait(until.elementLocated(By.id("get_media_button")),10000);
    mediaButton.click();
    let nameButton = await driver.wait(until.elementLocated(By.id("name_button")),10000);
    nameButton = await driver.wait(until.elementIsVisible(nameButton),1000);
    nameButton.click();
    await driver.sleep(100);
    // 4 directions and 'enter' for a non movement one 
    const actions = [Key.ENTER, Key.ARROW_LEFT, Key.ARROW_DOWN, Key.ARROW_UP, Key.ARROW_RIGHT];
    while(true){
      const direction = Math.floor(Math.random()* 5);
      await driver.actions().keyDown(actions[direction]).perform();
      await driver.actions().keyUp(actions[direction]).perform();
      await driver.sleep(509);
    }
  }catch(error){
    console.log(error);
    await driver.close();
  }
}

for(let i =0; i<20; i++){
  runDummyUser();
}
