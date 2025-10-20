import axios from '../../utils/axios'
export const asyncRecipeActions = () =>async (dispatch, getState) => {
  try {
    const res =await axios.get("/recipes");
    // dispatch(res);
    console.log("dispatched :", res);
  } catch (error) {
    console.log(error);
  }
};
export const asyncAddRecipeActions=(recipe)=>async (dispatch,getState)=>{
    try {
        const res=await axios.post('/recipes',recipe);
        console.log('new recipe added successfully',res);
        
        
    } catch (error) {
       return console.log('err creating recipe',error);
        
    }
}
