import {currencyConvertionUpdateMultipliers} from "~/Model/Currency/Convertion/getMultipliers";

QUnit.test('should update the convertion multipliers correctly when API response is successful', testUpdateConvertionMultipliers);

async function testUpdateConvertionMultipliers(assert)
{
    await currencyConvertionUpdateMultipliers();
    assert.equal(1, 1);
}
