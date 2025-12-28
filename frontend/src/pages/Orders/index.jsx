import React from 'react';
import Tables from './Tables';
import { MyAccountSidebar } from '../../components/MyAccountSidebar';


export const Orders = () => {
  return (
     <section className="py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <MyAccountSidebar />
        </div>
        <div className="col2 w-[80%]">
          <div className="shadow-md rounded-md p-2 bg-white">
            <div className="py-2 px-3 border-b border-gray-300">
              <h1 className="font-semibold">My Orders</h1>
              <p className="mt-0 mb-5">
                There are <span className="font-bold text-primary">2</span>{" "}
                orders in your List
              </p>
            <Tables/>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  )
}