import React, { useState } from "react";
import CgpaCard from "./CgpaCard";
import AddSemesterForm from "./AddSemesterForm";

const CgpaDashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // toggles refresh state
  };

  return (
    <div className="p-4">
      <CgpaCard refresh={refresh} />
      {/* <AddSemesterForm onSuccess={handleRefresh} /> */}
    </div>
  );
};

export default CgpaDashboard;
