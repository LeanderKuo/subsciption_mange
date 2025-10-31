import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Locale } from '../i18n/translations';
import { useLocale } from '../i18n/LocaleProvider';

type LanguageSwitcherProps = {
  value: Locale;
  onChange: (locale: Locale) => void;
  variant?: 'dark' | 'light';
  minWidth?: number;
};

export const LanguageSwitcher = ({
  value,
  onChange,
  variant = 'dark',
  minWidth = 140,
}: LanguageSwitcherProps) => {
  const { t } = useLocale();

  const isDark = variant === 'dark';

  const handleChange = (event: SelectChangeEvent<Locale>) => {
    onChange(event.target.value as Locale);
  };

  return (
    <FormControl
      size="small"
      sx={{
        minWidth,
        '& .MuiInputBase-root': {
          color: isDark ? '#fff' : '#000',
          backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#fff',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: isDark ? 'rgba(255,255,255,0.32)' : '#ccc',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: isDark ? '#fff' : '#000',
        },
        '& .MuiSvgIcon-root': {
          color: isDark ? '#fff' : '#000',
        },
        '& .MuiInputLabel-root': {
          color: isDark ? '#fff' : '#000',
        },
      }}
    >
      <InputLabel>{t('header.language.label')}</InputLabel>
      <Select value={value} label={t('header.language.label')} onChange={handleChange}>
        <MenuItem value="en">{t('header.language.en')}</MenuItem>
        <MenuItem value="zh-TW">{t('header.language.zh-TW')}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
