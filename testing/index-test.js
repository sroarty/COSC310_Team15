// Tests to check if the correct intent meta-data is extracted from user's input 
// text query

it('HeadPain', async function() {
    
    const resJson = await dialogflow.detectIntent(
      'i have a stabbing pain in my head');
    expect(resJson.queryResult).to.include.deep.keys('parameters');

    expect(resJson.queryResult.parameters).to.deep.equal({
      'paintypes': 'stabbing', 'specific-location': 'head',
    });
  });

  it('ChestPain', async function() {
    
    const resJson = await dialogflow.detectIntent(
      'i have pain in my chest');
    expect(resJson.queryResult).to.include.deep.keys('parameters');

    expect(resJson.queryResult.parameters).to.deep.equal({
      'paintypes': 'pain', 'specific-location': 'chest',
    });
  });

  it('LegPain', async function() {
    
    const resJson = await dialogflow.detectIntent(
      'i have pain in my legs from a biking accident');
    expect(resJson.queryResult).to.include.deep.keys('parameters');

    expect(resJson.queryResult.parameters).to.deep.equal({
      'paintypes': 'pain', 'specific-location': 'legs', 'injury': 'biking',
    });
  });

  it('burning_pain', async function() {
    
    const resJson = await dialogflow.detectIntent(
      'i have pain burning pain in my back');
    expect(resJson.queryResult).to.include.deep.keys('parameters');

    expect(resJson.queryResult.parameters).to.deep.equal({
      'paintypes': 'burning',
    });
  });

  it(async function() {
    
    const resJson = await dialogflow.detectIntent(
      'i have pain burning pain in my neck');
    expect(resJson.queryResult).to.include.deep.keys('parameters');

    expect(resJson.queryResult.parameters).to.deep.equal({
      'paintypes': 'burning', 'specific-location': 'neck',
    });
  });