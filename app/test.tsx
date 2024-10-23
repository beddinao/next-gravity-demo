
function Homeee() {
    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);
  
    // Fetch items on component mount
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      const res = await fetch('/api/items');
      const data: Item[] = await res.json();
      setItems(data);
    };
  
    const handleAddItem = async () => {
      if (name.trim()) {
        const res = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
        const newItem: Item = await res.json();
        setItems([...items, newItem]);
        setName('');
      }
    };
  
    const handleUpdateItem = async () => {
      if (editId && name.trim()) {
        await fetch('/api/items', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editId, name }),
        });
        fetchItems(); // Refetch items after update
        setName('');
        setEditId(null);
      }
    };
  
    const handleDeleteItem = async (id: number) => {
      await fetch('/api/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchItems(); // Refetch items after deletion
    };
  
    return (
      <div>
        <h1>CRUD App with Next.js, SQLite, and TypeScript</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
        />
        <button onClick={editId ? handleUpdateItem : handleAddItem}>
          {editId ? 'Update' : 'Add'} Item
        </button>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => { setEditId(item.id); setName(item.name); }}>Edit</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  