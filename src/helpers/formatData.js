function formatData (data) {
  const newData = data.map((item) => {
    return {
      board_name: item.name,
      board_id: item._id,
      board_dates: {
        create: item.createdAt,
        update: item.updatedAt
      },
      board_columns: [...item.columns]
    }
  })
  return newData
}

export { formatData }
