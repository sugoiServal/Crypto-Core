import axios from "axios";
import { useEffect, useState } from "react";
import CoinItem from './CoinItem'
import './Coins.css'
import { Link } from 'react-router-dom'
import {RiDownloadCloud2Fill} from'react-icons/ri'


export default function Coins() {
  const [coins, SetCoins] = useState(null);
  const [isShowMore, SetIsShowMores] = useState(false);

  const [searchText, setSearchText] = useState('');
  
  useEffect (() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${isShowMore ? '50' : '10'}&page=1&sparkline=true`
    const getData = async () => {
      try {
        console.log('Try crul api')
        const response = await axios.get(url)
        SetCoins(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    return () => {};
  }, [isShowMore])
  return (
    <>
      <div className='container mt-12'>
        <div className="flex items-center mb-4 mt-5">
          <h1 className='text-2xl font-bold mr-8'>Search Asset</h1>
          <form >
            <input type="text"
              onChange={(e)=>setSearchText(e.target.value)} 
              placeholder='Search a coin '
              className='search-box'/>
          </form>
        </div>
        {coins &&
          <table className='w-full border-collapse text-center'>
            <thead className="border-b-2 ">
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th className="hidden md:table-cell">volume</th>
                <th className="hidden md:table-cell">Mkt cap</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {coins.filter((coin)=>{
                if(!searchText) {
                  return coin;
                } else if (coin.name.toLowerCase().includes(searchText.toLowerCase())) {
                  return coin;
                }
              }).map((coin) => (
                  <CoinItem coin={coin} />
              ))}
            </tbody>
          </table>
        }
      </div>
      
      {coins &&
        <div className="max-w-[1180px] m-auto flex flex-row items-center justify-end">
          <div className="btn mt-2" onClick={()=>SetIsShowMores(!isShowMore)}>
            <p className="uppercase">Show More</p>
            <RiDownloadCloud2Fill className='ml-2 w-10 ' size={35} />
          </div>
        </div>
      }

    </>
  )
}
