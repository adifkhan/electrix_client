import React from "react";
import "./BreadCrumbs.css";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ breadcrumb }) => {
  return (
    <div>
      <div className="breadCrumbs text-accent flex flex-col items-center pt-16 pb-10 mt-[-30px]">
        <p className="text-3xl font-semibold uppercase">{breadcrumb.page}</p>
        <div className="text-sm font-medium  breadcrumbs">
          <ul>
            {breadcrumb.bread.map((item, i) => (
              <li key={i}>
                <Link to={item.address}>{item.name}</Link>
              </li>
            ))}
            <li>{breadcrumb.page}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
