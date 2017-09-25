import blessed from 'blessed';


export default function List({ options, select }) {
  const list = blessed.list({ ...options });
  list.on('select', select)
  return list
}
