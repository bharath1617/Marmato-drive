import React, { useState, useEffect } from 'react';
import './App.css'
import { FaList, FaTh } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState([]);
  const [searchs, setSearchs] = useState("");
  const [flexorgrid, setFlexorgrid] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  function changetoflex() {
    setFlexorgrid(true);
  }
  function changetogrid() {
    setFlexorgrid(false);
  }
  function searchedtext(text) {
    const regex = new RegExp(`\\b${searchs}\\b`, 'gi');
    const updatedText = text.map(value => {
      const tostylecolorOrsize = JSON.stringify(value);
      return tostylecolorOrsize.replace(regex, match => `<span style="background-color: rgba(209, 252, 55, 0.97)">${match}</span>`);
    });
    return updatedText.join('');
  }

  return (
    <div className='App'>
      <h1>PLP</h1>
      <div className='inputs'>
        <input placeholder='Type something to search...' onChange={e => { setSearchs(e.target.value) }}></input>
        <FaList className='icons' onClick={changetoflex} />
        <FaTh className='icons' onClick={changetogrid} />
      </div>
      <div className={flexorgrid ? "container" : "grid-container"} >
        {products.map((product, index) => (
          <div key={index} className="product-container">
            <div className='image-container'>
              <img src={product.product_image} alt={product.product_title} />
              <h3 className='badge'>{product.product_badge}</h3>
            </div>
            <div>
              <h2>{product.product_title}</h2>
              <div className='datasize'>
                {product.product_variants.map((variant, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: searchedtext(Object.values(variant)) }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

