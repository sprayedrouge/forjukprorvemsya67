import { DesignTheme } from '@/shared/ui';
import { DesignPicker } from '@/widgets/design-picker';

export function DesignSelectPage() {
  return (
    <>
      <DesignTheme design="select" />
      <DesignPicker />
    </>
  );
}
