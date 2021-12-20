import React, { useState, useEffect } from "react";
import styled from "styled-components";

function StockItem({ stock, watchlistData, handleAdd, handleRemove }) {
  const [showOptions, setShowOptions] = useState(false);
  const [watchlistBag, setWatchlistBag] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const name = stock.name.slice(0, stock.name.length - 5);
  const currentPrice = stock.currentPrice;
  const exchangeName = stock.name.slice(stock.name.length - 3);
  const percentageDiff = (
    ((stock.currentPrice - stock.yesterdayPrice) / stock.yesterdayPrice) *
    100
  ).toFixed(2);

  useEffect(() => {
    // 1 indicates inside watchlist bag
    setWatchlistBag(stock.watchlist);

    // if watchlist containes the stock, set isWatchlist to true, else false
    let isWatched = watchlistData.some(function (item) {
      return item.name.includes(name);
    });
    setIsWatchlist(isWatched);
  }, [name, watchlistData, stock]);

  return (
    <>
      <StockItemContainer
        onMouseEnter={() => {
          setShowOptions(true);
        }}
        onMouseLeave={() => {
          setShowOptions(false);
        }}
        percentageDiff={percentageDiff}
        isWatchlist={isWatchlist}
        watchlistBag={watchlistBag}
      >
        <Options>
          {showOptions &&
            (isWatchlist ? (
              <button
                onClick={() => {
                  handleRemove(stock, watchlistData);
                }}
              >
                <img src="images/trash.png" alt="x" />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleAdd(stock);
                }}
              >
                <img src="images/plus.png" alt="+" />
              </button>
            ))}
        </Options>
        <Top>
          <h3>{name}</h3>
          <p>{currentPrice}</p>
        </Top>
        <Bottom>
          <h5>{exchangeName}</h5>
          <div>
            <Arrow></Arrow>
            <p>{percentageDiff}</p>
          </div>
        </Bottom>
      </StockItemContainer>
    </>
  );
}

export default StockItem;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  h5 {
    font-size: 14px;
    color: grey;
    font-weight: 400;
    background-color: #fafafa;
    padding: 5px 10px;
    border-radius: 6px;
  }
`;

const Options = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;

  display: flex;
  justify-content: flex-end;

  button {
    width: 50px;
    height: 40px;
    border: 2px solid #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 4px;

    img {
      width: 16px;
    }
  }
`;

// Arrow base style
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
`;

const StockItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 14px 20px;
  position: relative;
  animation: animate 0.2s ease-out;

  &:hover {
    background-color: #fafafa;
  }

  /* Animation */
  @keyframes animate {
    0% {
      opacity: 0;
      transform: translateY(40%);
    }

    70% {
      opacity: 0.3;
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* if watchlistBag is set, adds a border left, else adds a transparent border of 3px. */
  ${({ watchlistBag }) =>
    watchlistBag
      ? "border-left: 3px solid var(--primary-color)"
      : "border-left: 3px solid transparent"};

  h3 {
    font-weight: 600;
    font-size: 16px;

    /* If percentage difference is > 0, set color to blue, else set color to red */
    color: ${({ percentageDiff }) =>
      percentageDiff > 0 ? "var(--secondary-color)" : "var(--tertiary-color)"};
  }

  /* For the top section, if percentage difference is > 0, set color to blue, else set color to red */
  ${Top} {
    p {
      color: ${({ percentageDiff }) =>
        percentageDiff > 0
          ? "var(--secondary-color)"
          : "var(--tertiary-color)"};
    }
  }

  /* Displays correct arrow and color based on the percentage difference */
  ${Arrow} {
    ${({ percentageDiff }) =>
      percentageDiff > 0
        ? "border-bottom: 7px solid var(--secondary-color)"
        : "border-top: 7px solid var(--tertiary-color)"}
  }

  ${Options} {
    /* If stock is watchlist, change image color to red, else change it to grey */
    img {
      filter: ${({ isWatchlist }) =>
        isWatchlist
          ? "invert(52%) sepia(86%) saturate(3794%) hue-rotate(329deg) brightness(107%) contrast(121%)"
          : "invert(13%) sepia(1%) saturate(278%) hue-rotate(316deg) brightness(103%) contrast(80%)"};
    }

    button:hover {
      cursor: pointer;
      border: 2px solid transparent;
    }

    button:hover {
      background-color: ${({ isWatchlist }) =>
        isWatchlist ? "var(--red-color)" : "var(--secondary-color)"};
    }

    button:hover img {
      filter: invert(100%) sepia(4%) saturate(775%) hue-rotate(223deg)
        brightness(116%) contrast(100%);
    }
  }
`;
