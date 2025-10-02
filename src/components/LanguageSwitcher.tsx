import { Select } from 'antd';
import i18n from '../i18n';

const LanguageSwitcher = () => {
  return (
    <div className='fixed top-3 right-3 z-50'>
      <Select
        size='small'
        value={i18n.language}
        style={{ width: 100 }}
        onChange={(v) => i18n.changeLanguage(v)}
        options={[
          { value: 'en', label: 'English' },
          { value: 'ar', label: 'العربية' },
        ]}
      />
    </div>
  );
};

export default LanguageSwitcher;
