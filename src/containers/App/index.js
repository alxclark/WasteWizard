import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import Banner from '../../components/Banner';
import { Wrapper } from '../../components/Wrapper';
import Search from '../../components/Search';
import ItemList from '../../components/ItemList';
import Favourites from '../../components/Favourites';
import isEmptyOrSpaces from '../../lib/isEmptyOrSpaces';
import NoData from '../../components/NoData';
import Page from '../../components/Page';
import useLocalStorage from '../../lib/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../config';

export default function App() {
  const [items, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [favouritedItems, setFavouritedItems] = useLocalStorage(LOCAL_STORAGE_KEY, []);

  async function getItems() {
    const response = await fetch(API_URL);
    const json = await response.json();
    setAllItems(json);
  }

  function handleSearch(queryString) {
    if (isEmptyOrSpaces(queryString)) {
      setSelectedItems([]);
    } else {
      const query = queryString.toLowerCase();
      const filteredItems = items.filter((item) => {
        const keywords = item.keywords.toLowerCase().split(', ');
        const queryMatchesKeyword = keywords.some(keyword => keyword.includes(query))
        return queryMatchesKeyword;
      });
      setSelectedItems(filteredItems);
    }
  }

  function handleFavourite(item) {
    const alreadyFavouriteIndex = favouritedItems.findIndex(
      favourite => favourite.title === item.title
    );
    const alreadyFavourite = alreadyFavouriteIndex > -1;

    if (alreadyFavourite) {
      const newFavourites = [
        ...favouritedItems.slice(0, alreadyFavouriteIndex),
        ...favouritedItems.slice(alreadyFavouriteIndex + 1)
      ];
      setFavouritedItems(newFavourites);
    } else {
      setFavouritedItems([...favouritedItems, item]);
    }
  }

  function handleResetResults() {
    setSelectedItems([]);
  }

  function showAllItems() {
    setSelectedItems(items);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Page>
      <Banner />
      <Wrapper>
        <Search handleSearch={handleSearch} resetResults={handleResetResults} />
        <ItemList
          items={selectedItems}
          favourites={favouritedItems}
          handleFavourite={handleFavourite}
        />
        {selectedItems.length < 1 && (
          <NoData handleClick={showAllItems} />
        )}
      </Wrapper>
      <Favourites
        items={favouritedItems}
        handleFavourite={handleFavourite}
      />
    </Page>
  );

}
