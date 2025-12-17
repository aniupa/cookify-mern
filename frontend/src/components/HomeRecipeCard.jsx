import React from 'react'

import styles from "../cssFiles/Home.module.css";
const HomeRecipeCard = ({item}) => {
    const {imageUrl,title,description}=item
  return (
    // <div></div>
     <div className={styles.categorySlider}> 
      <div className={styles.card}>
          <img
            src={imageUrl? imageUrl:'loading'}
            alt={title? title:""}
          />
          <div>
            <h4>{title? title:""}</h4>
            <p>{description? description:""}</p>
          </div>
          </div>
          
        </div> 
        
  )
}

export default HomeRecipeCard