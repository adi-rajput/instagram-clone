import React from 'react'
import Feed from './feed'
import { Outlet } from 'react-router'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/getAllPost'
const Home = () => {
  useGetAllPost()
  return (
    <div className='flex '>
          <div className='flex-grow'>
                <Feed />
                <Outlet/>
          </div>
          <RightSidebar/>
    </div>
  )
}

export default Home