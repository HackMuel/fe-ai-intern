import ChatApp from './components/ChatApp';
import ChatWidget from './components/ChatWidget';

// Pilih tampilan lewat env:
//   VITE_UI_MODE=widget  -> floating widget (bisa di-embed di halaman mana pun)
//   default              -> aplikasi full-page enterprise
const mode = import.meta.env.VITE_UI_MODE;

export default function App() {
  return mode === 'widget' ? <ChatWidget /> : <ChatApp />;
}
