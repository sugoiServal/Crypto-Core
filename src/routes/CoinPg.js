import React from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import LineChart from '../components/LineChart';
import './CoinPg.css'

export default function CoinPg() {
  const [coinDetail, SetCoinDetail] = useState([]);
  const [coinPrice, SetCoinPrice] = useState([]);

  const {coinId} = useParams()
  useEffect (() => {
    // https://api.coingecko.com/api/v3/coins/bitcoin

    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?community_data=false&developer_data=false&sparkline=true`
    const getData = async () => {
      try {
        console.log(`Try crul api ${coinId}`)
        const response = await axios.get(url)
        SetCoinDetail(response.data)
        SetCoinPrice(response.data.market_data.sparkline_7d.price)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    return () => {};
  }, [])
  // coinPrice && console.log(coinPrice)
  return (
    <div className='coin-container'>
      <div className="content">
        <h1 className='text-4xl'>{coinDetail.name}</h1>
      </div>
      <div className="content">
        <div className="rank">
          <span className='rank-btn'>Rank # {coinDetail.market_cap_rank}</span>
        </div>
        <div className="info">
          <div className="coin-heading">
            { coinDetail.image && <img src={coinDetail.image.small} alt="" />}
            <p className='ml-4'>{coinDetail.name}</p>
            {coinDetail.symbol ? <p>{coinDetail.symbol.toUpperCase()}/USD</p> : null}
          </div>
          <div className="coin-price">
            {coinDetail.market_data?.current_price ? <h1 className='text-4xl'>${coinDetail.market_data.current_price.usd.toLocaleString()}</h1> : null}
          </div>
        </div>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>14d</th>
              <th>30d</th>
              <th>1yr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{coinDetail.market_data?.price_change_percentage_1h_in_currency ? <p>{coinDetail.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
              <td>{coinDetail.market_data?.price_change_percentage_24h_in_currency ? <p>{coinDetail.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
              <td>{coinDetail.market_data?.price_change_percentage_24h_in_currency ? <p>{coinDetail.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
              <td>{coinDetail.market_data?.price_change_percentage_24h_in_currency ? <p>{coinDetail.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
              <td>{coinDetail.market_data?.price_change_percentage_24h_in_currency ? <p>{coinDetail.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
              <td>{coinDetail.market_data?.price_change_percentage_24h_in_currency ? <p>{coinDetail.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {coinPrice &&
        <LineChart rawData={coinPrice}/>
      }
      <div className='content'>
        <div className='stats'>
            <div className='left'>
                <div className='row'>
                    <h4>24 Hour Low</h4>
                    {coinDetail.market_data?.low_24h ? <p>${coinDetail.market_data.low_24h.usd.toLocaleString()}</p> : null}
                </div>
                <div className='row'>
                    <h4>24 Hour High</h4>
                    {coinDetail.market_data?.high_24h ? <p>${coinDetail.market_data.high_24h.usd.toLocaleString()}</p> : null}                            </div>

            </div>
            <div className='right'>
                <div className='row'>
                    <h4>Market Cap</h4>
                    {coinDetail.market_data?.market_cap ? <p>${coinDetail.market_data.market_cap.usd.toLocaleString()}</p> : null}
                </div>
                <div className='row'>
                    <h4>Circulating Supply</h4>
                    {coinDetail.market_data ? <p>{coinDetail.market_data.circulating_supply}</p> : null}
                </div>
            </div>
        </div>
      </div>
      <div className='content'>
                    <div className='about'>
                        <h3>About</h3>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coinDetail.description ? coinDetail.description.en : ''),
                        }}/>
                       
                    </div>
            </div>
    </div>
  )
}
