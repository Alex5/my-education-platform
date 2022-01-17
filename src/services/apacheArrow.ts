import {Table, FloatVector, DateVector} from 'apache-arrow';
import data from './apacheData.json';

const LENGTH = 2000;

const rainAmounts = Float32Array.from(
    { length: LENGTH },
    () => Number((Math.random() * 20).toFixed(1)));

const rainDates = Array.from(
    { length: LENGTH },
    (_, i) => new Date(Date.now() - 1000 * 60 * 60 * 24 * i));

// export const rainfall = Table.new(
//     [FloatVector.from(rainAmounts), DateVector.from(rainDates)],
//     ['precipitation', 'date']
// );

export const getData = () => {
    console.log(data)
}

getData()
