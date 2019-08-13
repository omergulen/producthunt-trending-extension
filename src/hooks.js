import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { getProducts, isEmptyList } from './helpers/producthunt';
import useLocalStorage from './hooks/useLocalStorage';

import {
  KEY_PRODUCTS,
  KEY_SELECTED_PERIOD,
  KEY_SCHEMA_VERSION,
  CURRENT_SCHEMA_VERSION
} from './helpers/localStorage';



export const useFetchProducts = ({ since }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      let result = await getProducts(since);
      const { data } = result;
      setData(data);
    } catch (e) {
      console.log(e.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [since]);

  return {
    isLoading,
    data,
    error,
    fetchData,
  };
};

export function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useProducts = () => {
  const [selectedPeriod, setSelectedPeriod] = useSelectedPeriod();
  const [products, setProducts] = useLocalStorage(KEY_PRODUCTS, []);

  const prevPeriod = usePrevious(selectedPeriod);

  const valueChanged = prevPeriod !== selectedPeriod;

  const isEmpty = isEmptyList(products);

  const { isLoading, data, error, fetchData } = useFetchProducts({
    since: selectedPeriod,
  });

  useEffect(() => {
    if (isEmpty || valueChanged) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueChanged]);

  useMemo(() => {
    if (!isLoading && !error && data) {
      setProducts(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isLoading]);

  return {
    isEmpty,
    isLoading,
    products,
    error,
    reload: fetchData,
    selectedPeriod,
    setSelectedPeriod,
  };
};

export const useSelectedPeriod = () =>
  useLocalStorage(KEY_SELECTED_PERIOD, 'daily');

export const useCheckLocalStorageSchema = () => {
  const [schemaVersion, setSchemaVersion] = useLocalStorage(KEY_SCHEMA_VERSION);
  if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
    window.localStorage.clear();
    setSchemaVersion(CURRENT_SCHEMA_VERSION);
  }
};
