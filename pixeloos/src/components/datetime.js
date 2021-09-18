const convertDate = (dateTime) => {
    if (dateTime !== 'N/A') {
        const date = dateTime.slice(0, dateTime.indexOf('T'));
        const time = dateTime.slice(dateTime.indexOf('T')+1, dateTime.lastIndexOf(':'));
        return `${time} ${date}`;
    }
    return 'N/A'
}

export default convertDate;