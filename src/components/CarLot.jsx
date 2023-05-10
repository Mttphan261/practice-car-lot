import React, {useEffect, useState} from "react";
import Search from "./Search";
import Cars from "./Cars";
import NewCarForm from "./NewCarForm";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
function CarLot() {

  const [carArray, setCarArray] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/cars')
    .then((r) => r.json())
    .then((data) => setCarArray(data))
  }, [])

  //POST
  //POST - CB to addCar to array
  function addCar(addedCar) {
    setCarArray([...carArray, addedCar])
  }

  //Search state
  const [search, setSearch] = useState('')

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  //Filter state
  const [filter, setFilter] = useState('')

  const searchedCars = [...carArray].filter((el) => {
    const searchMatch = el.car_model.toLowerCase().includes(search.toLowerCase());
    const filterMatch = filter === el.car_make || filter === '';
    return searchMatch && filterMatch
  })

  function handleFilter(e) {
    setFilter(e.target.value)
  }

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Search handleSearch={handleSearch} search={search} handleFilter={handleFilter} filter={filter}/> {/**You can edit this line */}
        </Grid>
        <Grid item xs={6}>
          <NewCarForm addCar={addCar}/> {/**You can edit this line */}
        </Grid>
        <Grid item xs={12}>
          {/** enter your code below */}
          <Cars carArray={searchedCars} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CarLot;
