import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../utils/avatarHelper';
import { supabase } from '../../../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { getUserProfile, updateUserProfile, getLevels } from '../../../services/users';
import InputField from '../../../components/atomsUi/inputField/inputField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import theme from '../../../styles/theme';
import './style.css';
import type { Database } from '../../../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Level = Database['public']['Tables']['levels']['Row'];

const LANGUAGES = ['Español', 'Inglés'];
const GENDERS = ['Masculino', 'Femenino', 'Prefiero no decir'];
const COUNTRIES = [
  'Colombia',
  'Estados Unidos',
  'México',
  'España',
  'Argentina',
  'Chile',
  'Perú',
  'Ecuador',
  'Venezuela',
  'Brasil',
];

const selectStyles = {
  color: '#8692A6',
  backgroundColor: '#282A2F',
  fontFamily: 'Satoshi',
  fontSize: '18.695px',
  fontWeight: 500,
  borderRadius: '7.011px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8692A6',
    borderWidth: '0.584px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3f3f3f',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8692A6',
    borderWidth: '0.584px',
  },
  '& .MuiSvgIcon-root': {
    color: '#8692A6',
  },
  '& .MuiSelect-select': {
    padding: '12px 14px',
  },
};

const menuItemStyles = {
  color: '#8692A6',
  fontFamily: 'Satoshi',
  fontSize: '18.695px',
  fontWeight: 500,
  padding: '8px 14px',
  margin: '2px 8px',
  borderRadius: '4px',
  minHeight: 'auto',
  '&:hover': {
    backgroundColor: '#3f3f3f',
  },
  '&.Mui-selected': {
    backgroundColor: '#1a181b',
    '&:hover': {
      backgroundColor: '#3f3f3f',
    },
  },
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    gender: '',
    country: '',
    language: '',
    organization: '',
  });
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isEditingReferralCode, setIsEditingReferralCode] = useState(false);
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    
      const levelsData = await getLevels();
      setLevels(levelsData);

     
      if (!user?.id) {
        return;
      }

      setLoading(true);
      const userProfile = await getUserProfile(user.id);
      
      if (userProfile) {
        setProfile(userProfile);
        setFormData({
          name: userProfile.name || '',
          nickname: userProfile.nickname || '',
          gender: userProfile.gender || '',
          country: userProfile.country || '',
          language: userProfile.language || '',
          organization: userProfile.organization || '',
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [user?.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        nickname: profile.nickname || '',
        gender: profile.gender || '',
        country: profile.country || '',
        language: profile.language || '',
        organization: profile.organization || '',
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setSaving(true);
    try {
      const updatedProfile = await updateUserProfile(user.id, formData);
      if (updatedProfile) {
        setProfile(updatedProfile);
        setIsEditing(false);
        setSnackbarMessage('Perfil actualizado correctamente');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      setSnackbarMessage('Error al guardar los cambios');
      setSnackbarOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCopyReferralLink = () => {
    if (!profile?.referral_code) return;
    
    const referralLink = `${window.location.origin}/signup?ref=${profile.referral_code}`;
    navigator.clipboard.writeText(referralLink);
    setSnackbarMessage('¡Enlace copiado al portapapeles!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEditReferralCode = () => {
    setReferralCodeInput(profile?.referral_code || '');
    setIsEditingReferralCode(true);
  };

  const handleCloseReferralCodeModal = () => {
    setIsEditingReferralCode(false);
    setReferralCodeInput('');
  };

  const handleSaveReferralCode = async () => {
    if (!user?.id || !referralCodeInput.trim()) return;

    const codeToCheck = referralCodeInput.trim().toUpperCase();
    
    if (!/^[A-Z0-9]{4,12}$/.test(codeToCheck)) {
      setSnackbarMessage('El código debe tener entre 4 y 12 caracteres (solo letras y números)');
      setSnackbarOpen(true);
      return;
    }

    if (codeToCheck === profile?.referral_code?.toUpperCase()) {
      setSnackbarMessage('Debes ingresar un código diferente al actual');
      setSnackbarOpen(true);
      return;
    }

    setCheckingCode(true);
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('referral_code', codeToCheck)
        .neq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        setSnackbarMessage('Este código ya está en uso');
        setSnackbarOpen(true);
        setCheckingCode(false);
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ referral_code: codeToCheck })
        .eq('user_id', user.id);

      if (error) throw error;

      if (profile) {
        setProfile({ ...profile, referral_code: codeToCheck });
      }

      setIsEditingReferralCode(false);
      setSnackbarMessage('Código de referido actualizado correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al actualizar código:', error);
      setSnackbarMessage('Error al actualizar el código de referido');
      setSnackbarOpen(true);
    } finally {
      setCheckingCode(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Header />
        <div style={{ color: 'white', padding: '1rem', textAlign: 'center' }}>
          Cargando perfil...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <Header />
        <div style={{ color: 'white', padding: '1rem' }}>
          No hay datos de perfil disponibles.
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header />
      <h1 className="profile-title">Perfil</h1>
      <div className="profile-content">
            <div className="profile-left">
          <div className="card profile-card">
                <div className="card-header">
              <img 
                src="/icons/edit.png" 
                alt="edit" 
                className="edit-icon" 
                onClick={handleEdit}
              />
                </div>
            
            <div className="profile-avatar-container">
                    <Avatar
                src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture || profile.avatar_url || undefined}
                {...stringAvatar(profile.name || profile.email || 'U')}
                className="profile-avatar2"
              />
            </div>

            <h2 className="profile-name-text">{profile.name || 'Usuario'}</h2>
            <p className="profile-email-text">{profile.email || 'Sin correo'}</p>
          </div>
                </div>

        <div className="profile-right">
          <div className="profile-badges-grid">
            <button className="badge-card badge-card-full" onClick={() => {
              setSnackbarMessage('Nivel actual y puntos');
              setSnackbarOpen(true);
            }}>
              <img src="/images/trofeo.png" alt="trophy" className="badge-icon" />
              <div className="trophy-level-info">
                {profile.current_level !== null && levels.length > 0 && (
                  <>
                    <span className="level-name">
                      {levels.find(l => l.level_number === profile.current_level)?.name || 'N/A'}
                    </span>
                    <span className="level-points">
                      {profile.points || 0} puntos
                    </span>
                  </>
                )}
              </div>
            </button>
            <button className="badge-card" onClick={() => navigate('/my-coupons')}>
              <img src="/images/image1.png" alt="badge" className="badge-icon" />
              <span className="badge-text">Mis Cupones</span>
            </button>
            <button className="badge-card badge-card-center" onClick={() => navigate('/my-purchases')}>
              <span className="badge-text">Mis Compras</span>
            </button>
            <button className="badge-card badge-card-reviews" onClick={() => {
              setSnackbarMessage('Próximamente: verás tus reseñas aquí');
              setSnackbarOpen(true);
            }}>
              <img src="/images/image2.png" alt="badge" className="badge-icon" />
              <span className="badge-text">Mis Reseñas</span>
            </button>
            <button className="badge-card badge-card-referral" onClick={handleCopyReferralLink}>
              <div className="referral-whole-content">
                <span className="referral-label">
                  <ContentCopyIcon sx={{ fontSize: '16px', verticalAlign: 'middle', mr: 0.5 }} />
                  Comparte tu enlace
                </span>
                <div className="referral-input-container">
                  <span className="referral-code-display">
                    {profile.referral_code || 'Sin código'}
                  </span>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditReferralCode();
                    }}
                    sx={{ 
                      color: theme.palette.pink.main,
                      padding: '4px',
                      '&:hover': { backgroundColor: 'rgba(255, 0, 153, 0.1)' }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </button>
          </div>
        </div>
                </div>

      <Modal
        open={isEditing}
        onClose={handleCloseModal}
        aria-labelledby="modal-edit-profile"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 600 },
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: '#232323',
            border: '1px solid #4f4f4f',
            borderRadius: '0.8rem',
            p: 3,
            outline: 'none',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
              Editar Perfil
            </Typography>
            <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className="profile-form">
            <InputField
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            
            <InputField
              label="Apodo"
              value={formData.nickname}
              onChange={handleChange}
              name="nickname"
            />
            
            <FormControl fullWidth>
              <label style={{ 
                color: '#696F79',
                fontFamily: 'Satoshi',
                fontSize: '18.695px',
                fontWeight: 500,
                marginBottom: '10px',
              }}>
                Género
              </label>
              <Select
                value={formData.gender}
                onChange={(e) => handleSelectChange('gender', e.target.value)}
                displayEmpty
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#232323',
                      border: '1px solid #4f4f4f',
                      borderRadius: '7.011px',
                      boxShadow: 'none',
                    },
                  },
                }}
              >
                <MenuItem value="" sx={menuItemStyles}>
                  <em>Seleccionar género</em>
                </MenuItem>
                {GENDERS.map((gender) => (
                  <MenuItem key={gender} value={gender} sx={menuItemStyles}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <label style={{ 
                color: '#696F79',
                fontFamily: 'Satoshi',
                fontSize: '18.695px',
                fontWeight: 500,
                marginBottom: '10px',
              }}>
                País
              </label>
              <Select
                value={formData.country}
                onChange={(e) => handleSelectChange('country', e.target.value)}
                displayEmpty
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#232323',
                      border: '1px solid #4f4f4f',
                      borderRadius: '7.011px',
                      boxShadow: 'none',
                    },
                  },
                }}
              >
                <MenuItem value="" sx={menuItemStyles}>
                  <em>Seleccionar país</em>
                </MenuItem>
                {COUNTRIES.map((country) => (
                  <MenuItem key={country} value={country} sx={menuItemStyles}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <label style={{ 
                color: '#696F79',
                fontFamily: 'Satoshi',
                fontSize: '18.695px',
                fontWeight: 500,
                marginBottom: '10px',
              }}>
                Idioma
              </label>
              <Select
                value={formData.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                displayEmpty
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#232323',
                      border: '1px solid #4f4f4f',
                      borderRadius: '7.011px',
                      boxShadow: 'none',
                    },
                  },
                }}
              >
                <MenuItem value="" sx={menuItemStyles}>
                  <em>Seleccionar idioma</em>
                </MenuItem>
                {LANGUAGES.map((language) => (
                  <MenuItem key={language} value={language} sx={menuItemStyles}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <InputField
              label="Organización"
              value={formData.organization}
              onChange={handleChange}
              name="organization"
            />
                </div>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{
                color: theme.palette.white.main,
                borderColor: theme.palette.grayMedium.main,
                '&:hover': {
                  borderColor: theme.palette.white.main,
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving}
              sx={{
                backgroundColor: theme.palette.pink.main,
                color: theme.palette.white.main,
                '&:hover': {
                  backgroundColor: theme.palette.pink.main,
                  opacity: 0.9,
                },
              }}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            backgroundColor: '#232323',
            color: '#FFFFFF',
            border: `1px solid ${theme.palette.pink.main}`,
            borderRadius: '0.8rem',
            '& .MuiAlert-icon': {
              color: theme.palette.pink.main,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Modal
        open={isEditingReferralCode}
        onClose={handleCloseReferralCodeModal}
        aria-labelledby="modal-edit-referral-code"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: '#232323',
            border: '1px solid #4f4f4f',
            borderRadius: '0.8rem',
            p: 3,
            outline: 'none',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
              Editar enlace de referido
            </Typography>
            <IconButton onClick={handleCloseReferralCodeModal} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Warning Banner */}
          <Box 
            sx={{ 
              backgroundColor: '#FFB800',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3
            }}
          >
            <WarningIcon sx={{ color: '#FF8500', fontSize: '20px' }} />
            <Typography sx={{ color: '#000000', fontSize: '14px', fontWeight: 500 }}>
              Si cambias tu enlace, el anterior ya no funcionará.
            </Typography>
          </Box>

          <Typography sx={{ color: '#8692A6', fontSize: '13px', mb: 1 }}>
            Enlace de referido actual:
          </Typography>
          <Typography sx={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace', mb: 3, wordBreak: 'break-all' }}>
            {profile?.referral_code ? `${window.location.origin}/signup?ref=${profile.referral_code}` : 'Sin código'}
          </Typography>

          <Typography sx={{ color: '#8692A6', fontSize: '13px', mb: 1 }}>
            Editar código:
          </Typography>
          <InputField
            label=""
            value={referralCodeInput}
            onChange={(e) => setReferralCodeInput(e.target.value.toUpperCase())}
            name="referral_code"
            placeholder="Ej: ALEX2024"
          />
          <Typography sx={{ color: '#8692A6', fontSize: '12px', mt: 1, mb: 2 }}>
            4-12 caracteres. Solo letras y números.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleCloseReferralCodeModal}
              sx={{
                color: theme.palette.white.main,
                borderColor: theme.palette.grayMedium.main,
                '&:hover': {
                  borderColor: theme.palette.white.main,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveReferralCode}
              disabled={checkingCode}
              sx={{
                backgroundColor: theme.palette.pink.main,
                color: theme.palette.white.main,
                '&:hover': {
                  backgroundColor: theme.palette.pink.main,
                  opacity: 0.9,
                },
              }}
            >
              {checkingCode ? 'Verificando...' : 'Guardar cambios'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePage;
