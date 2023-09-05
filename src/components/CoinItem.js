import React from 'react'
import './Coins.css'
import { useNavigate  } from 'react-router-dom'
import { Sparklines, SparklinesLine } from 'react-sparklines';


export default function CoinItem({coin}) {
  let navigate = useNavigate();
  const handleCoinDetailRedir = () => {
    navigate(`/coin/${coin.id}`);
  }
  return (
    <tr className='coin-row cursor-pointer' onClick={handleCoinDetailRedir}>
        <td>{coin.market_cap_rank}</td>
        <td >
          <div className="img-symbol">
            <img src={coin.image} alt="" sizes={20}/>
            <p className=''>{`${coin.name} (${coin.symbol.toUpperCase()})`}</p>
          </div>
        </td>  
        <td>${coin.current_price.toLocaleString()}</td>
        <td>{
          coin.price_change_percentage_24h > 0 ? (
            <p className='text-green-600'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className='text-red-600'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          )
        }</td>
        <td className='hidden md:table-cell'>${coin.total_volume.toLocaleString()}</td>
        <td className='hidden md:table-cell'>${coin.market_cap.toLocaleString()}</td>
        <td>
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color='teal' />
          </Sparklines>
        </td>
    </tr>
  )
}
