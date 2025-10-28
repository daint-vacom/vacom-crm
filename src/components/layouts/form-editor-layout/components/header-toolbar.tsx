import { Download, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function HeaderToolbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="flex items-center gap-2.5">
      <Button variant="ghost">
        <Download /> Xuất JSON
      </Button>

      <Button disabled>
        <Save /> Lưu
      </Button>
    </nav>
  );
}
