import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import StockItem from "../components/StockItem";
import styled from "styled-components";

function Home() {
  const [search, setSearch] = useState("");
  const [stockData, setStockData] = useState([]);
  const [watchlistData, setWatchlistData] = useState([]);
  const [page, setPage] = useState(1);
  const displayDom = useRef();

  const fetchWatchlist = async () => {
    let watchlist = await axios.get(`http://localhost:8000/watchlist`);
    setWatchlistData(watchlist.data);
  };

  // on search
  useEffect(() => {
    // get all the stocks with the search query, and display the results of 1st page.
    const fetchData = async () => {
      let data = await axios.get(
        `http://localhost:8000/stocks?q=${search}&_page=${1}&_limit=20`
      );
      let watchlist = await axios.get(`http://localhost:8000/watchlist`);
      setStockData(data.data);
      setWatchlistData(watchlist.data);
      setPage(1);
    };
    fetchData();
  }, [search]);

  // on page change, fetch the next page results and append it to the current data.
  useEffect(() => {
    const fetchData = async () => {
      let data = await axios.get(
        `http://localhost:8000/stocks?q=${search}&_page=${page}&_limit=20`
      );
      let watchlist = await axios.get(`http://localhost:8000/watchlist`);
      setStockData([...stockData, ...data.data]);
      setWatchlistData(watchlist.data);
    };
    fetchData();
  }, [page]);

  // Adds a new stock to the watchlist
  const handleAdd = async (stock) => {
    await axios.post("http://localhost:8000/watchlist", {
      ...stock,
      watchlist: "1",
    });
    fetchWatchlist();
  };

  // Removes the stock from the watchlist
  const handleRemove = async (stock, watchlistData) => {
    // First match the id of stock item inside watchlistData
    let id = "";
    for (let item of watchlistData) {
      if (item.name === stock.name) {
        id = item.id;
      }
    }

    // Then delete the id from watchlist
    await axios.delete(`http://localhost:8000/watchlist/${id}`);
    fetchWatchlist();
  };

  // Get the window scroll location
  const handleScroll = () => {
    let scrollSectionHeight = displayDom.current.scrollTop;
    let scrollclientHeight = displayDom.current.scrollHeight;

    // If user touches the bottom of window, increment the page
    if (scrollclientHeight - scrollSectionHeight < 900) {
      setPage(page + 1);
    }
  };
  return (
    <>
      {/* Navbar Component*/}
      <Navbar />

      {/* SearchBar Component*/}
      <SearchBar setSearch={setSearch} search={search} />

      {/* Stocks List */}
      <DisplayStocks ref={displayDom} onScroll={handleScroll}>
        <Content>
          {/* Watchlist */}
          {watchlistData.map((stock) => {
            return (
              <StockItem
                key={stock.id}
                stock={stock}
                watchlistData={watchlistData}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
              />
            );
          })}

          {/* Stocks */}
          {stockData.map((stock) => {
            const name = stock.name.slice(0, stock.name.length - 5);
            return (
              <StockItem
                key={name}
                stock={stock}
                watchlistData={watchlistData}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
              />
            );
          })}
        </Content>
      </DisplayStocks>
    </>
  );
}

export default Home;

const DisplayStocks = styled.div`
  width: 500px;
  height: calc(100vh - 150px);
  overflow-y: auto;
  visibility: hidden;

  &:hover {
    visibility: visible;
  }
`;

const Content = styled.div`
  visibility: visible;
  background-color: #eee;
  padding: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
