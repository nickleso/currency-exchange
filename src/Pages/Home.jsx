import { useState } from 'react';
import { useEffect } from 'react';
import { getCurrency } from 'services/getCurrency';

import { MainForm } from 'components/MainForm/MainForm';

export const Home = () => {
  const [currency, setCurrency] = useState('USD');
  const [value, setValue] = useState('');

  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;

      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);

      getCurrency(crd.latitude, crd.longitude)
        .then(data =>
          setCurrency(data.results[0].annotations.currency.iso_code)
        )
        .catch(error => console.log(error));
    }

    function error(err) {
      setCurrency('USD');
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const mainFormSubmit = inputValue => {
    console.log(inputValue);
    setValue(inputValue);
  };
  return (
    <>
      <h1>Your current currency: {currency}</h1>
      <MainForm setValue={mainFormSubmit} />
    </>
  );
};
