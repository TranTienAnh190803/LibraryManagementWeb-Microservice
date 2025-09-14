export const convertToDate = (date) => {
    const d = new Date(date);

    const yyyy = d.getFullYear();
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    return `${dd}/${MM}/${yyyy}`;
}