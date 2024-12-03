import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Monthly from "./Monthly";

const Plan = () => {
  return (
    <div className="buy-plans p-[10px]">
      <div className="text-center text-[#566a7f]">
        <h1 className="text-[35px]">Pricing Plans</h1>
        <p>
          All plans include advanced tools and features to boost your
          productivityChoose the best plan to fit your needs.
        </p>
      </div>

      <div className="tab-section ">
        <Tabs>
          <TabList className="flex items-center justify-center border  mx-[42%]">
            <Tab className= "hover:bg-[#27004a] text-[white]  px-2 py-2 border-none">Monthly</Tab>
            <Tab className="bg-[#27004a] text-[white]  px-2 py-2" >Yearly</Tab>
            <Tab className="bg-[#27004a] text-[white]  px-2 py-2">Lifetime</Tab>
          </TabList>

          <TabPanel>
            <Monthly/>
          </TabPanel>
          
          <TabPanel>
            
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Plan;