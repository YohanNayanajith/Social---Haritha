import { useEffect, useMemo, useState } from "react";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import Charts from "../components/charts/Charts";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminUsers,
  getAdminUsersDummy,
  getUsers,
  getUsersDummy,
} from "../redux/userApiCalls";
import { getEvent, getEventDummy } from "../redux/eventApiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export const DashboardImpl = () => {
  const [userStats, setUserStats] = useState([]);
  const [other, setOther] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [event, setEvent] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [featuredData, setFeaturedData] = useState([]);
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.user.token);
  // const otherUsers = useSelector((state) => state.user.otherUsers);
  // const adminUsers = useSelector((state) => state.user.adminUsers);
  // const events = useSelector((state) => state.event.events);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // useEffect(() => {
  //   const getCountInventoryData = async () => {
  //     const result1 = await getUsersDummy(dispatch, token);
  //     if (result1) {
  //       setOther(result1.length);
  //       console.log("Success");
  //       setLoading1(false);
  //     } else {
  //       console.log("Unsuccess");
  //     }
  //   };
  //   getCountInventoryData();
  // }, []);

  // useEffect(() => {
  //   const getCountInventoryData = async () => {
  //     const result2 = await getAdminUsersDummy(dispatch, token);
  //     if (result2) {
  //       console.log(result2.length);
  //       console.log(admin);
  //       setAdmin(result2.length);
  //       console.log("Success");
  //       setLoading2(false);
  //     } else {
  //       console.log("Unsuccess");
  //     }
  //   };
  //   getCountInventoryData();
  // }, []);

  // useEffect(() => {
  //   const getCountInventoryData = async () => {
  //     const result = await getEventDummy(dispatch, token);
  //     if (result) {
  //       setEvent(result.length);
  //       setLoading3(false);
  //       console.log("Success");
  //     } else {
  //       console.log("Unsuccess");
  //     }
  //   };
  //   getCountInventoryData();
  // }, []);

  let featureData = [
    {
      index: 1,
      title: "No of Users",
      number: 20,
      // percentage: -1.4,
      isDowngrade: false,
      // text: "Compared to last month",
    },
    {
      index: 2,
      title: "No of Posts",
      number: 32,
      // percentage: +1.4,
      isDowngrade: true,
      // text: "Compared to last month",
    },
    {
      index: 3,
      title: "No of Admin Users",
      // number: admin,
      number: 1,
      // percentage: -1.4,
      isDowngrade: false,
      // text: "Compared to last month",
    },
  ];

  useEffect(() => {
    let data = [
      { name: MONTHS[0], User: 15, Post: 12 },
      { name: MONTHS[1], User: 20, Post: 25 },
      { name: MONTHS[2], User: 65, Post: 78 },
      { name: MONTHS[3], User: 45, Post: 30 },
      { name: MONTHS[4], User: 100, Post: 80 },
      { name: MONTHS[5], User: 74, Post: 90 },
      { name: MONTHS[6], User: 20, Post: 10 },
      { name: MONTHS[7], User: 30, Post: 23 },
      { name: MONTHS[8], User: 10, Post: 25 },
      { name: MONTHS[9], User: 60, Post: 78 },
      { name: MONTHS[10], User: 56, Post: 41 },
      { name: MONTHS[11], User: 23, Post: 25 },
    ];
    setUserStats(data);

    // setFeaturedData(featureData);
  }, []);

  return (
    <div>
      {loading1 && loading2 && loading3 ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <FeaturedInfo data={featureData} />
      )}
      <Charts
        data={userStats}
        title="Social Data Analytics"
        grid
        dataKey1="User"
        dataKey2="Post"
      />
    </div>
  );
};
