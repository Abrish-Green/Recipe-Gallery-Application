import { useEffect, useState} from 'react'
import axios from 'axios'

export default function useRecipeSearch(query, page) {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [recipe, setRecipe] = useState([])
    const [hasMore,setHasMore] = useState(false)
    const [nextPage,setNextPage] = useState("")

    useEffect(()=>{
        setRecipe([])
    },[query])


  useEffect(()=>{
      setLoading(true)
      setError(false)

      let cancelRequest
      axios({
          method: 'GET',
          url: 'https://www.larecipe.com/api/recipes/',
          params: {q: query, page:page},
          cancelToken: new axios.CancelToken(c => cancelRequest = c),          
      }).then((res)=>{ 
          setRecipe(prevRecipes =>{
              return [...prevRecipes, ...res.data.posts.map(post =>post)]
          })
          
          if(res.data.has_next_page) setNextPage(res.data.page)

          setHasMore(res.data.has_next_page)
          setLoading(false)
      }).catch(e=>{
          if(axios.isCancel(e)) return
          setError(true)
      })
      return () => cancelRequest()
  },[query, page])

return { loading, error, recipe, hasMore, nextPage}
}
