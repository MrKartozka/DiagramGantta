import { useState, useEffect, React, Fragment } from "react";
import "./TableDiagram.css";

const TableDiagram = ({ data }) => {
	// Состояния для управления раскрытием строк, сортировкой данных, поисковым запросом и текущим сортируемым столбцом
	const [open, setOpen] = useState({});
	const [sortedData, setSortedData] = useState([...data]);
	const [sortKey, setSortKey] = useState(null);
	const [sortAscending, setSortAscending] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// Функция для переключения раскрытия строк
	const toggleOpen = (i) => {
		setOpen((open) => ({
			...open,
			[i]: !open[i],
		}));
	};

	// Компонент стрелок сортировки
	const SortArrows = ({ sortKey, currentKey, sortAscending }) => (
		<div className="arrow-container">
			<div
				className={`arrow up ${
					currentKey === sortKey && !sortAscending ? "hidden" : ""
				}`}
			/>
			<div
				className={`arrow down ${
					currentKey === sortKey && sortAscending ? "hidden" : ""
				}`}
			/>
		</div>
	);

	// Функция для задания ключа сортировки и направления сортировки
	const sortData = (key) => {
		setSortKey(key);
		setSortAscending((sortAscending) =>
			sortKey === key ? !sortAscending : sortAscending
		);
	};

	// Эффект для сортировки данных при изменении ключа сортировки или направления сортировки
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

	// Эффект для обновления отсортированных данных при изменении исходных данных
	useEffect(() => {
		setSortedData([...data]);
	}, [data]);

	// Возвращаем JSX для отображения таблицы
	return (
		<div>
			<table className="main-table">
				<thead>
					<tr style={{ backgroundColor: "#f2f2f2" }}>
						<th className="table-header"></th>
						<th className="table-header pointer">Tasks</th>
						<th
							onClick={() => sortData("deviation")}
							className="table-header pointer"
						>
							deviation
							<SortArrows
								sortKey="deviation"
								currentKey={sortKey}
								sortAscending={sortAscending}
							/>
						</th>
						<th
							onClick={() => sortData("priority")}
							className="table-header pointer"
						>
							priority
							<SortArrows
								sortKey="priority"
								currentKey={sortKey}
								sortAscending={sortAscending}
							/>
						</th>
						<th
							onClick={() => sortData("percent")}
							className="table-header pointer"
						>
							percent
							<SortArrows
								sortKey="percent"
								currentKey={sortKey}
								sortAscending={sortAscending}
							/>
						</th>
						<th className="table-header pointer">planDate</th>
						<th className="table-header">actualDate</th>
						<th
							onClick={() => sortData("quantity")}
							className="table-header pointer"
						>
							quantity
							<SortArrows
								sortKey="quantity"
								currentKey={sortKey}
								sortAscending={sortAscending}
							/>
						</th>
						<th
							onClick={() => sortData("unitPrice")}
							className="table-header pointer"
						>
							unitPrice
							<SortArrows
								sortKey="unitPrice"
								currentKey={sortKey}
								sortAscending={sortAscending}
							/>
						</th>
						<th className="table-header">dce</th>
					</tr>
				</thead>
				<tbody>
					{sortedData
						.filter((row) =>
							row.label
								.toLowerCase()
								.includes(searchTerm.toLowerCase())
						)
						.map((row, i) => (
							<Fragment key={i}>
								<tr style={{ borderBottom: "1px solid #ddd" }}>
									<td className="table-cell">
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleOpen(i);
											}}
											style={{
												backgroundColor: "blue",
												color: "white",
											}}
										>
											{open[i] ? "-" : "+"}
										</button>
									</td>
									<td className="table-cell">{row.label}</td>
									<td className="table-cell">
										{row.deviation}
									</td>
									<td className="table-cell">
										{row.priority}
									</td>
									<td className="table-cell">
										{row.percent}
									</td>
									<td className="table-cell">
										{row.planDate}
									</td>
									<td className="table-cell">
										{row.actualDate}
									</td>
									<td className="table-cell">
										{row.quantity}
									</td>
									<td className="table-cell">
										{row.unitPrice}
									</td>
									<td className="table-cell">{row.dce}</td>
								</tr>
								{row.tasks &&
									open[i] &&
									row.tasks.map((subRow, j) => (
										<Fragment key={`${i}-${j}`}>
											<tr
												style={{
													borderBottom:
														"1px solid #ddd",
												}}
											>
												<td
													className="table-cell"
													style={{
														paddingLeft: "20px",
													}}
												>
													<button
														onClick={(e) => {
															e.stopPropagation();
															toggleOpen(
																`${i}-${j}`
															);
														}}
														style={{
															backgroundColor:
																"blue",
															color: "white",
														}}
													>
														{open[`${i}-${j}`]
															? "-"
															: "+"}
													</button>
												</td>
												<td className="table-cell">
													{subRow.label}
												</td>
												<td className="table-cell">
													{subRow.deviation}
												</td>
												<td className="table-cell">
													{subRow.priority}
												</td>
												<td className="table-cell">
													{subRow.percent}
												</td>
												<td className="table-cell">
													{subRow.planDate}
												</td>
												<td className="table-cell">
													{subRow.actualDate}
												</td>
												<td className="table-cell">
													{subRow.quantity}
												</td>
												<td className="table-cell">
													{subRow.unitPrice}
												</td>
												<td className="table-cell">
													{subRow.dce}
												</td>
											</tr>
											{subRow.tasks &&
												open[`${i}-${j}`] &&
												subRow.tasks.map(
													(subSubRow, k) => (
														<Fragment
															key={`${i}-${j}-${k}`}
														>
															<tr
																style={{
																	borderBottom:
																		"1px solid #ddd",
																}}
															>
																<td
																	className="table-cell"
																	style={{
																		paddingLeft:
																			"40px",
																	}}
																>
																	<button
																		style={{
																			visibility:
																				"hidden",
																		}}
																	>
																		-
																	</button>{" "}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.label
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.deviation
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.priority
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.percent
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.planDate
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.actualDate
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.quantity
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.unitPrice
																	}
																</td>
																<td className="table-cell">
																	{
																		subSubRow.dce
																	}
																</td>
															</tr>
														</Fragment>
													)
												)}
										</Fragment>
									))}
							</Fragment>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default TableDiagram;
