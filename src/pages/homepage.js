import React, { useState, useEffect } from 'react';
import Layout from '../component/layouts/layout';
import Loading from '../component/loading';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Button, Dropdown, Form, Modal  } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { BsCalendar4Range,BsTrash3Fill,BsPenFill,BsList,BsFillPieChartFill } from 'react-icons/bs';
import { IoMdSwap } from 'react-icons/io';
import Chart from '../component/chart';
import { BACKEND_URL } from '../services/helper';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <div className="d-flex flex-wrap my-3">
        <div className="me-auto">
          <div className="d-flex align-items-center">
            <span>Go to page &nbsp;</span>
        <input
          type="number"
          className="form-control-sm"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
        />
          </div>
        </div>
        <div className="">
          <button className="btn btn-primary">Download</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover" {...getTableProps()}>
          <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
          </div>
          <div className="d-flex align-items-center">
            <span>Rows Per Page  &nbsp;</span>
            <select
              className="form-select-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 15, 20, 25, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center">
      <ul className="pagination pagination-sm justify-content-end">
        <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
          <button
            className="page-link fw-bold"
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </button>
        </li>
        <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
          <button
            className="page-link fw-bold"
            type="button"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>
        </li>
        <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
          <button
            className="page-link fw-bold"
            type="button"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {'>'}
          </button>
        </li>
        <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
          <button
            className="page-link fw-bold"
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </div>
        </div>
      </div>
    </div>
  );
}

const Tablemy = () => {
  const [loading, setloading] = useState(false);
  const [gTdata, setgTdata] = useState([]);
  const [filter, setfilter] = useState('365');
  const [selectdate, setselectdate] = useState([]);
  const [type, setType] = useState('all');
  const [showModel, setShowmodel] = useState(false);
  const [editable, seteditable] = useState(null);
  const [viewData, setViewData] = useState('table');

  const columns = React.useMemo(() => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => <span>{moment(value).format('DD-MM-YYYY')}</span>,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'References',
        accessor: 'reference',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
//       {
//         Header: 'Actions',
//         Cell: (value, record) => (
//           <div>
// <Button variant="primary" type="submit" onClick={() => { seteditable(record); setShowmodel(true); }}> edit </Button>
//               <Button variant="danger" type="submit" onClick={() => deleteHandler(record)}> delete </Button>
//           </div>
//         ),
//       },
{
  Header: 'Actions',
  Cell: ({ row }) => (
    <div className='table-cell-buttons'>
      <Button
        variant="info"
        className="btn-sm btn-circle ml-10"
        type="submit"
        onClick={() => {
          seteditable(row.original);
          setShowmodel(true);
        }}
      >
        <BsPenFill/>
      </Button>
      <Button
        variant="danger"
        className="btn-sm btn-circle ml-10"
        type="submit"
        onClick={() => deleteHandler(row.original)}
      >
         <BsTrash3Fill/>
      </Button>
    </div>
  ),
}

    ]);

  const handleSelect = (eventKey) => {
    setfilter(eventKey);
  };

  const handletype = (eventKey) => {
    setType(eventKey);
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setloading(true);
        const res = await axios.post(`${BACKEND_URL}/api/v2/transections/get-transection`, {
          userid: user._id,
          filter,
          selectdate,
          type,
        });
        setloading(false);
        setgTdata(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
  }, [filter, selectdate, type]);

  const gettransections = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setloading(true);
      const res = await axios.post(`${BACKEND_URL}/api/v2/transections/get-transection`, {
        userid: user._id,
        filter,
        selectdate,
        type,
      });
      setgTdata(res.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch data', { duration: 2000 });
    }
  };

  const deleteHandler = async (row) => {
    try {
      setloading(true);
      await axios.post(`${BACKEND_URL}/api/v2/transections/delete-transection`, { transectionId: row._id });
      gettransections();
      setloading(false);
      toast.success('Transaction deleted',{duration:2000})
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete transaction',{duration:2000});
    }
  };
  





  

  const submithandle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setloading(true);
      if (editable) {
        await axios.post(`${BACKEND_URL}/api/v2/transections/edit-transection`, { payload: { ...values, userid: user._id }, tnsId: editable._id });
        await gettransections();
        toast.success('Transaction updated successfully', { duration: 2000 });
      } else {
        await axios.post(`${BACKEND_URL}/api/v2/transections/add-transection`, { ...values, userid: user._id });
        await gettransections();
        toast.success('Transaction added successfully', { duration: 2000 });
      }
      // await gettransections();
      setShowmodel(false);
      seteditable(null);
      setloading(false); 
    } catch (error) {
      console.error(error);
      setloading(false);
      toast.error('Failed to add/update transaction', { duration: 2000 });
    }
  };

  return (
    <Layout>
      {loading && <Loading />}
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between py-3 border-bottom">
          <div className="d-flex col-md-6">
            <div>
              <h6>Select Time</h6>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="" className='border border-warning'>
                  {filter ? (filter === '7' ? 'Last 1 Week' : filter === '30' ? 'Last 1 Month' : 'Last 1 Year') : 'Select an option'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="7">Last 1 Week</Dropdown.Item>
                  <Dropdown.Item eventKey="30">Last 1 Month</Dropdown.Item>
                  <Dropdown.Item eventKey="365">Last 1 Year</Dropdown.Item>
                  <Dropdown.Item eventKey="custom">Custom</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="px-3">
              {filter === 'custom' && (
                <DateRangePicker value={selectdate} onApply={(e, picker) => setselectdate([picker.startDate, picker.endDate])}>
                  <button className="border bg-white rounded-pill p-1 border-info text-secondary">
                    {/* <BsCalendarRange />&nbsp; */}
                    {selectdate && selectdate[0] ? (
                      <>
                        {selectdate[0].format('DD/MM/YYYY')}&nbsp;&nbsp; <IoMdSwap />&nbsp;&nbsp; {selectdate[1].format('DD/MM/YYYY')}
                      </>
                    ) : (
                      <>
                        Start Date &nbsp;<BsCalendar4Range />&nbsp; End Date
                      </>
                    )}
                  </button>
                </DateRangePicker>
              )}
            </div>
          </div>

          <div className="d-flex  col-md-4">
            <div className="d-flex align-items-center">
              <div className='mr-2'>Select type</div>
              <div>
                <Dropdown onSelect={handletype}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {type ? (type === 'all' ? 'All' : type === 'income' ? 'Income' : 'Expense') : 'Select an option'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="all">All</Dropdown.Item>
                    <Dropdown.Item eventKey="income">Income</Dropdown.Item>
                    <Dropdown.Item eventKey="expense">Expense</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="px-3">
              <div className="btn-group" role="group" aria-label="Basic example">
                <Button
                  className="btn btn-sm btn-light"
                  variant={viewData === 'table' ? 'primary' : 'secondary'}
                  onClick={() => setViewData('table')}
                >
                  <BsList />
                </Button>
                <Button
                  className="btn btn-sm btn-light"
                  variant={viewData === 'chart' ? 'primary' : 'secondary'}
                  onClick={() => setViewData('chart')}
                >
                  <BsFillPieChartFill />
                </Button>
              </div>
            </div>
          </div>

          <div className="col-md-2 text-end ">
            {/* <button className="btn btn-sm btn-primary" onClick={() => setShowmodel(true)}>
              Add New
            </button> */}
            <Button variant="primary"className='btn-sm' onClick={() => setShowmodel(true)}>
              Add New
              </Button>
            {/* <Link to="/table"><button className='btn btn-secondary'>table</button></Link> */}
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {viewData === 'table' ? (
          <div>
            <Table columns={columns} data={gTdata} />
          </div>
        ) : (
          <Chart alltns={gTdata} />
        )}
      </div>

      <Modal show={showModel} onHide={() => setShowmodel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editable ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submithandle} initialValues={editable}>
          <Form.Group>
  <Form.Label className='mb-0'>Amount</Form.Label>
  <Form.Control type="text" name="amount"className="form-control-sm"/> {/* Verify that name attributes are correct */}
</Form.Group>
            <Form.Group>
              <Form.Label className='mb-0 mt-1'>Type</Form.Label>
              <Form.Control as="select" name="type"className="form-control-sm">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>
            <Form.Group >
              <Form.Label className='mb-0 mt-1'>Category</Form.Label>
              <Form.Control as="select" name="category"className="form-control-sm">
                <option value="salary">Salary</option>
                <option value="tip">Tip</option>
                <option value="project">Project</option>
                <option value="food">Food</option>
                <option value="movies">Movies</option>
                <option value="bills">Bills</option>
                <option value="medical">Medical</option>
                <option value="fee">Fee</option>
                <option value="tax">Tax</option>
              </Form.Control>
            </Form.Group>
            <Form.Group >
              <Form.Label className='mb-0 mt-1'>Date</Form.Label>
              <Form.Control type="date" name="date" className="form-control-sm"/>
            </Form.Group>
            <Form.Group >
              <Form.Label className='mb-0 mt-1'>Reference</Form.Label>
              <Form.Control type="text" name="reference" className="form-control-sm"/>
            </Form.Group>
            <Form.Group >
              <Form.Label className='mb-0 mt-1'>Description</Form.Label>
              <Form.Control type="text" name="description" className="form-control-sm"/>
            </Form.Group>

            
            <div className='mt-2'>
            <div className="d-flex justify-content-end">
              <Button variant="danger"className='btn-sm me-2' onClick={() => setShowmodel(false)}>
                Close
              </Button>
              <Button variant="primary" className='btn-sm'type="submit">
                Save
              </Button>
            </div>
            </div>


          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Tablemy;
