import React, { useState } from "react";

import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userApiCalls";
import { TableComponent } from "../../components/TableComponent";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LinearProgress from "@mui/material/LinearProgress";
import { removeOtherUsers } from "../../redux/userRedux";

export const UserListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState("s");
  // const token = useSelector((state) => state.user.token);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const permissionsData = useSelector(
    (state) => state.permissionData.permissionsData
  );
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeOtherUsers());
      const result = await getUsers(dispatch);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      otherUsers.map(
        (item) => {
          // if (item.status) {
          rowData.push({
            id: item._id,
            col1: item.username,
            col3: item.from,
            col4: item.profilePicture,
            col5: item.city,

            col8: item.email,
            col9: item.isAdmin,
          });
        }
        // }
      );
      setRows(rowData);
    };
    getNormalUserData();
  }, [trigger]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // alert(id);
        const result = await getUsers(id,dispatch);
        if(result){
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }else{
          Swal.fire("Delete Unsuccess!", "Your file has not been deleted.", "error");
        }
        
      }
    });
  };

  const updateItem = (id) => {
    console.log(id);
    navigate(`/updateUser/${id}`);
  };

  const wishBirthday = (data) => {
    console.log(data);
    window.location.href = `https://api.whatsapp.com/send/?phone=${data.col7}`;
  };

  const changeItem = (id) => {
    console.log(id);
    //API call
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        alert(id);
        Swal.fire("Change!", "User activation changed.", "success");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "User Id", width: 300 },
    {
      field: "col1",
      headerName: "Full Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.col4} alt="" />
            {params.row.col1 + " " + params.row.col2}
          </div>
        );
      },
    },
    { field: "col8", headerName: "Email", width: 180 },
    // { field: "col6", headerName: "Address", width: 180 },
    // { field: "col7", headerName: "Contact", width: 180 },
    { field: "col5", headerName: "City", width: 180 },
    { field: "col3", headerName: "District", width: 180 },
    // {
    //   field: "col10",
    //   headerName: "Birthday",
    //   width: 180,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {/* params.row.isCancel */}
    //         <Stack direction="row" alignItems="center" spacing={1}>
    //           {params.row.col10}
    //           <IconButton
    //             aria-label="edit"
    //             size="large"
    //             color="success"
    //             onClick={() => wishBirthday(params.row)}
    //           >
    //             <CelebrationIcon />
    //           </IconButton>
    //         </Stack>
    //       </>
    //     );
    //   },
    // },
    {
      field: "col9",
      headerName: "Is Admin",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.col9 ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => changeItem(params.row.id)}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => changeItem(params.row.id)}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* {permissionsData.update_users ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => updateItem(params.row.id)}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )} */}

              {/* <IconButton
                aria-label="edit"
                size="large"
                color="success"
                onClick={() => updatePermission(params.row.id)}
              >
                <AdminPanelSettingsIcon />
              </IconButton> */}
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={() => deleteItem(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </>
        );
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        bgcolor: "#FFF",
      }}
    >
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <h2>Normal Users</h2>
            </div>
            {/* <div>
              {permissionsData.create_users ? (
                <Button
                  variant="contained"
                  href="/createUser"
                  // color="secondary"
                  endIcon={<AddIcon />}
                >
                  Create
                </Button>
              ) : (
                <></>
              )}
            </div> */}

            {/* <Button variant="contained">Contained1</Button> */}
          </Grid>

          <div style={{ marginTop: "20px" }}>
            <TableComponent rows={rows} columns={columns} />
          </div>
        </div>
      )}
    </Box>
  );
};
