import React, { useContext } from "react";
import styled from "styled-components";

const AllTask = ({ isLoaded, taskData }) => {
  return (
    <Container>
      <div className="bg-[#1c1c1c] p-5 rounded mt-5">
        <div className="mb-2 bg-red-400 py-2 px-4 flex justify-between rounded">
          <h2 className="w-1/5 text-lg font-medium text-center">
            Employee Name
          </h2>
          <h3 className="w-1/5 text-lg font-medium text-center">New Task</h3>
          <h5 className="w-1/5 text-lg font-medium text-center">Active Task</h5>
          <h5 className="w-1/5 text-lg font-medium text-center">Completed</h5>
          <h5 className="w-1/5 text-lg font-medium text-center">Failed</h5>
        </div>
        <div className="">
          {isLoaded &&
            taskData.map((elem, idx) => {
              return (
                <div
                  key={idx}
                  className="mb-2 border-2 border-emerald-500 py-2 px-4 flex justify-between rounded"
                >
                  <h2 className="w-1/5 text-lg font-medium text-center text-white">
                    {elem.username}
                  </h2>
                  <h3 className="w-1/5 text-lg font-medium text-center text-blue-600">
                    {elem.taskCounts.newTask}
                  </h3>
                  <h5 className="w-1/5 text-lg font-medium text-center text-yellow-400">
                    {elem.taskCounts.active}
                  </h5>
                  <h5 className="w-1/5 text-lg font-medium text-center  text-pink-400">
                    {elem.taskCounts.completed}
                  </h5>
                  <h5 className="w-1/5 text-lg font-medium text-center text-red-600">
                    {elem.taskCounts.failed}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 26vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;

export default AllTask;
