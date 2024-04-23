import React, { useEffect, useState, useMemo } from 'react';
import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import './Diagramm.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import dayjs from 'dayjs';

const CollapsibleTable = ({ data }) => {
  const [open, setOpen] = useState({});
  const [sortedData, setSortedData] = useState([...data]);
  const [sortKey, setSortKey] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOpen = (i) => {
    setOpen((open) => ({
      ...open,
      [i]: !open[i]
    }));
  };

  const SortArrows = ({sortKey, currentKey, sortAscending}) => (
    <div className='arrow-container'>
      <div className={`arrow up ${currentKey === sortKey && !sortAscending ? 'hidden' : ''}`} />
      <div className={`arrow down ${currentKey === sortKey && sortAscending ? 'hidden' : ''}`} />
    </div>
  );


  const sortData = (key) => {
    setSortKey(key);
    setSortAscending((sortAscending) => sortKey === key ? !sortAscending : sortAscending);
  }
  
  useEffect(() => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortAscending ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortAscending ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  }, [sortKey, sortAscending, data]);

  useEffect(() => {
    setSortedData([...data]);
  }, [data]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          position: "absolute", right: 180, top: 123,
          width: "200px",
          height: "30px",
          padding: "5px 10px 5px 30px",
          border: "1px solid #ccc",
          borderRadius: "15px",
          background: "#f1f1f1 url(/search-icon.png) no-repeat 5px center",
          backgroundSize: "20px 20px",
        }}
      />
    <table style={{width: "100%", border: "1px solid #ddd", borderCollapse: "collapse", marginTop: "20px"}}>
      <thead>
        <tr style={{backgroundColor: "#f2f2f2"}}>
          <th style={{padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}></th>
          <th style={{padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>Tasks</th>
          <th onClick={() => sortData('deviation')} style={{cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>
  deviation
  <SortArrows sortKey='deviation' currentKey={sortKey} sortAscending={sortAscending} />
</th>
<th onClick={() => sortData('priority')} style={{cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>
  priority
  <SortArrows sortKey='priority' currentKey={sortKey} sortAscending={sortAscending} />
</th>
<th onClick={() => sortData('progress')} style={{cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>
progress
  <SortArrows sortKey='progress' currentKey={sortKey} sortAscending={sortAscending} />
</th>
          <th style={{padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>planDate</th>
          <th style={{padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>actualDate</th>
          <th onClick={() => sortData('quantity')} style={{cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>
          quantity
  <SortArrows sortKey='quantity' currentKey={sortKey} sortAscending={sortAscending} />
</th>
          <th onClick={() => sortData('unitPrice')} style={{cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>
          unitPrice
  <SortArrows sortKey='unitPrice' currentKey={sortKey} sortAscending={sortAscending} />
</th>
          <th style={{padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd"}}>dce</th>
        </tr>
      </thead>
      <tbody>
      {sortedData.filter(row => row.label.toLowerCase().includes(searchTerm.toLowerCase())).map((row, i) => (
          <React.Fragment key={i}>
            <tr style={{borderBottom: "1px solid #ddd"}}>
            <td style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>
                <button onClick={(e) => {e.stopPropagation(); toggleOpen(i);}}
                        style={{backgroundColor: 'blue', color: 'white'}}>
                  {open[i] ? '-' : '+'}
                </button>
              </td>
              <td style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.label}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.deviation}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.priority}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.progress}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.planDate}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.actualDate}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.quantity}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.unitPrice}</td>
              <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{row.dce}</td>
            </tr>
            {row.tasks && open[i] && row.tasks.map((subRow, j) => (
              <React.Fragment key={`${i}-${j}`}>
                <tr style={{borderBottom: "1px solid #ddd"}}>
                  <td style={{padding: "12px", paddingLeft: '20px', textAlign: "left", borderRight: "1px solid #ddd"}}>
                    <button onClick={(e) => {e.stopPropagation(); toggleOpen(`${i}-${j}`);}}
                            style={{backgroundColor: 'blue', color: 'white'}}>
                      {open[`${i}-${j}`] ? '-' : '+'}
                    </button>
                  </td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.label}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.deviation}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.priority}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.progress}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.planDate}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.actualDate}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.quantity}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.unitPrice}</td>
                  <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subRow.dce}</td>
                </tr>
                {subRow.tasks && open[`${i}-${j}`] && subRow.tasks.map((subSubRow, k) => (
                  <React.Fragment key={`${i}-${j}-${k}`}>
                    <tr style={{borderBottom: "1px solid #ddd"}}>
                      <td style={{padding: "12px", paddingLeft: '40px', textAlign: "left", borderRight: "1px solid #ddd"}}>
                        <button style={{visibility: "hidden"}}>-</button> {/* invisible button to align the text */}
                      </td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.label}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.deviation}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.priority}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.progress}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.planDate}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.actualDate}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.quantity}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.unitPrice}</td>
                      <td  style={{padding: "12px", textAlign: "left", borderRight: "1px solid #ddd"}}>{subSubRow.dce}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function Diagram() {

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState('gantta');
  const [searchTerm, setSearchTerm] = useState("");
  const [ganttView, setGanttView] = useState('day');  // new state variable for the Gantt chart view

	const handleAvatarClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    }

     // handle increase time
  const increaseTime = () => {
    setGanttView(prevView => {
      switch(prevView) {
        case 'hour':
          return 'day';
        case 'day':
          return 'week';
        case 'week':
          return 'month';
        case 'month':
          return 'year';
        default:
          return prevView;
      }
    });
  }

  // handle decrease time
  const decreaseTime = () => {
    setGanttView(prevView => {
      switch(prevView) {
        case 'year':
          return 'month';
        case 'month':
          return 'week';
        case 'week':
          return 'day';
        case 'day':
          return 'hour';
        default:
          return prevView;
      }
    });
  }

  const ganttaData = [
    {
      "label": "Конвейер_РК-150",
      "dateStart": "2023-07-06 12:40:25",
      "dateEnd": "2023-07-12 12:40:25",
      "dragProject": true,
      "expanded": true,
      "deviation": null,
      "tasks": [
        {
          "label": "Лазер",
          "dateStart": "2023-07-06 16:40:25",
          "dateEnd": "2023-07-06 19:40:25",
          "dragProject": true,
          "expanded": true,
          "deviation": 5,
          "jobStatus": 0,
          "tasks": [
            {
              "label": "Pegas 38",
              "dateStart": "2023-07-06 16:40:25",
              "dateEnd": "2023-07-06 19:40:25",
              "dragProject": true,
              "expanded": true,
              "deviation": 0,
              "nowStatus": "Техобслуживание",
              "name": null,
              "profession": null,
              "description": "Фрезерный универсальный станок 5 осей ЧПУ"
            }
          ]
        },
        {
          "label": "Сверление",
          "dateStart": "2023-07-06 13:40:25",
          "dateEnd": "2023-07-06 14:40:25",
          "dragProject": true,
          "expanded": true,
          "deviation": 5,
          "jobStatus": 0,
          "tasks": [
            {
              "label": "Pegas 38",
              "dateStart": "2023-07-06 13:40:25",
              "dateEnd": "2023-07-06 14:40:25",
              "dragProject": true,
              "expanded": true,
              "deviation": 0,
              "nowStatus": "Техобслуживание",
              "name": null,
              "profession": null,
              "description": "Фрезерный универсальный станок 5 осей ЧПУ"
            }
          ]
        }
      ]
    },
    {
      "label": "Конвейер_РК-231",
      "dateStart": "2023-07-06 12:40:25",
      "dateEnd": "2023-07-12 12:40:25",
      "dragProject": true,
      "expanded": true,
      "deviation": null,
      "tasks": [
        {
          "label": "Токарная",
          "dateStart": "2023-07-06 13:40:25",
          "dateEnd": "2023-07-06 14:40:25",
          "dragProject": true,
          "expanded": true,
          "deviation": "5",
          "jobStatus": "Завершена",
          "tasks": [
            {
              "label": "Токарь",
              "dateStart": "2023-07-06 13:40:25",
              "dateEnd": "2023-07-06 14:40:25",
              "dragProject": true,
              "expanded": true,
              "deviation": 0,
              class: 'qa-team',
              "nowStatus": "Техобслуживание",
              "name": null,
              "profession": null,
              "description": "Фрезерный универсальный станок 5 осей ЧПУ"
            }
          ]
        }
      ]
    },
    {
      "label": "Конвейер_РК-21",
      "dateStart": "2023-07-10 14:40:25",
      "dateEnd": "2023-07-16 14:40:25",
      "dragProject": true,
      "expanded": true,
      "deviation": null,
      "tasks": []
    },
    {
      "label": "Конвейер_РК-500",
      "dateStart": "2023-07-06 14:40:25",
      "dateEnd": "2023-07-12 16:20:25",
      "dragProject": true,
      "expanded": true,
      "deviation": null,
      "tasks": []
    }
  ]

// Here we process the data before setting it to the state
const processedData = ganttaData.map(item => {
  // If actualDate exists for the parent order, use it as dateEnd
  if (item.actualDate) {
    item.dateEnd = item.actualDate;
  }

  // Calculate deviation
  if (item.dateEnd && item.actualDate) {
    const dateEnd = dayjs(item.dateEnd);
    const actualDate = dayjs(item.actualDate);
    item.deviation = Math.max(0, actualDate.diff(dateEnd, 'minute'));
  }

  if (item.tasks) {
    item.tasks = item.tasks.map(task => {
      // If actualDate exists, use it as dateEnd
      if (task.actualDate) {
        task.dateEnd = task.actualDate;
      }

      // Calculate deviation for tasks
      if (task.dateEnd && task.actualDate) {
        const dateEnd = dayjs(task.dateEnd);
        const actualDate = dayjs(task.actualDate);
        task.deviation = Math.max(0, actualDate.diff(dateEnd, 'minute'));
      }
      
      // Associate the progress of the parent item to the task
      task.progress = item.progress;

      // Also process the tasks at the 'resources' level
      if (task.tasks) {
        task.tasks = task.tasks.map(subtask => {
          // If actualDate exists, use it as dateEnd
          if (subtask.actualDate) {
            subtask.dateEnd = subtask.actualDate;
          }

          // Calculate deviation for resources
          if (subtask.dateEnd && subtask.actualDate) {
            const dateEnd = dayjs(subtask.dateEnd);
            const actualDate = dayjs(subtask.actualDate);
            subtask.deviation = Math.max(0, actualDate.diff(dateEnd, 'minute'));
          }

          // Associate the progress of the parent item (which is now the task) to the subtask
          subtask.progress = task.progress;

          return subtask;
        });
      }

      return task;
    });
  }
  return item;
});






const [filteredData, setFilteredData] = useState(processedData);

useEffect(() => {
  const newFilteredData = ganttaData
    .map(order => ({
      ...order,
      tasks: order.tasks.filter(operation => {
        const isMatch = operation.label.toLowerCase().includes(searchTerm.toLowerCase());
        console.log("Task label:", operation.label, "Search Term:", searchTerm, "Is Match:", isMatch);
        return isMatch;
      })
    }))
    .filter(order => {
      const isOrderMatch = order.label.toLowerCase().includes(searchTerm.toLowerCase());
      console.log("Order label:", order.label, "Search Term:", searchTerm, "Is Match:", isOrderMatch);
      return isOrderMatch || order.tasks.length > 0;
    });

  console.log("New Filtered Data:", newFilteredData);
  setFilteredData(newFilteredData);
}, [searchTerm]); 


  const handleButtonClick = (chart) => {
    setSelectedChart(chart);
  };

  const treeSize = 400;

  return (
    <div className="diagramm-home-screen">
      <div className="top-nav">
        <div className="user-profile" onClick={handleAvatarClick}>
          <img src="profile.png" alt="User Profile" />
          <span>John Doe</span>
		  {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li><a href="#">Change User</a></li>
                <li><a href="#">About Me</a></li>
                <li><a href="#">Settings</a></li>
              </ul>
            </div>
          )}
        </div>
        <Link to="/">
          <button className="home-button">
            <img src="/home.png" alt="settings" />
          </button>
        </Link>
        <img className="logo" src="masiot-logo.png" alt="Company Logo" />
      </div>
	  <div className="side-nav">
          <img src="notifications-small.png" className='notifications-icons' alt="notif-icon"/>
          <img src="mail-small.png" className='mail-icons' alt="mail-icon"/>
          <img src="referal-small.png" className='referal-icons' alt="referal-icon"/>
      </div>
      <div className="links">
        <button className="link1" onClick={() => handleButtonClick('gantta')}>
          <span>Gantta</span>
        </button>
        &nbsp;|&nbsp;
        <button className="link2" onClick={() => handleButtonClick('table')}>
          <span>Table</span>
        </button>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          position: "absolute", right: 180, top: 103,
          marginTop: "20px",
          width: "200px",
          height: "30px",
          padding: "5px 10px 5px 30px",
          border: "1px solid #ccc",
          borderRadius: "15px",
          background: "#f1f1f1 url(/search-icon.png) no-repeat 5px center",
          backgroundSize: "20px 20px",
        }}
      />
      </div>
      <button className="timeline" onClick={increaseTime}>Increase Time</button>
      <button className="timeline" onClick={decreaseTime}>Decrease Time</button>
      {selectedChart === 'gantta' && (
        <GanttChart
          dataSource={filteredData}
          taskColumns={[
            {
              label: 'Задача',
              value: 'label',
              size: '60%',
            },
            {
              label: 'Период (min)',
              value: 'duration',
			        formatFunction: (date) => parseInt(date),
			      },
            {
              label: 'Tasks',
              value: 'nomenclature',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'product',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'quantity',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'productionRate',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'customer',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'productivity',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'cost',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'priority',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'planDate',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'actualDate',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'purchase',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'blank',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'Number',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'Name',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'CodeOperation',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'gild',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'technicalprocess',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'outfit',
              hidden: true,
            },
            {
              label: 'Отклонение',
              value: 'deviation',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'name',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'profession',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'rank',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'jobStatus',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'nowStatus',
              hidden: true,
            },
			    ]}
		treeSize={treeSize}
		durationUnit="minute"
		id="gantta-gantt" 
    view={ganttView}  // use the state variable here
    className="gantt-chart"
    popupWindowTabs={['general']}
    />
			)}

{selectedChart === 'table' && <CollapsibleTable data={filteredData} />}
    </div>
	);
}

export default Diagram;