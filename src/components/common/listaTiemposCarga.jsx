import React, { Component } from "react";
import _ from "lodash";
import Table from "./table";
import SearchBox from "./../common/searchBox";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import BusesServices from "./../services/fake_buses";
import { paginate } from "../../utils/paginate";
import Pagination from "./pagination";

class ListaTiemposCargas extends Component {
  columns = [
    {
      path: "ppu",
      label: "Patente",
    },
    {
      path: "marquesina",
      label: "Marquesina",
    },
    {
      path: "fila",
      label: "Fila",
    },
    {
      path: "cargador",
      label: "Cargador",
    },
    {
      path: "tiempo",
      label: "Tiempo ~",
    },
  ];

  state = {
    salidas: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "tiempo", order: "asc" },
  };

  componentDidMount() {
    const salidas = BusesServices.getBuesProximasSalidas();
    this.setState({ salidas });
  }

  getTableData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      salidas: salidasTodas,
    } = this.state;

    let filtered = salidasTodas;
    //searching
    if (searchQuery) {
      filtered = salidasTodas.filter((s) =>
        s.ppu.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //Paginacion
    const salidas = paginate(sorted, currentPage, pageSize);

    return { totalCount: salidasTodas.length, data: salidas };
  };

  handleSort = (sortColumn) => {
    console.log("Sorting by: ", sortColumn);
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: salidas } = this.getTableData();

    return (
      <Accordion defaultActiveKey="">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={0}>
              Próximas Salidas (tiempos aproximados)
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={0}>
            <Card.Body>
              <div className="col-12">
                <SearchBox
                  value={searchQuery}
                  onChange={this.handleSearch}
                  placeHolder="Ingrese PPU a filtrar..."
                />
              </div>
              <div className="col-12">
                <Table
                  columns={this.columns}
                  data={salidas}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default ListaTiemposCargas;
