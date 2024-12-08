import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Registrar las fuentes
(pdfMake as any).vfs = pdfFonts['vfs'];

// Estilos por defecto
const defaultStyles = {
  header: {
    fontSize: 24,
    bold: true,
    color: '#24505c',
    font: 'Roboto',
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
  subheader: {
    fontSize: 16,
    color: '#24505c',
    font: 'Roboto',
    margin: [0, 10, 0, 5],
  },
  tableHeader: {
    fontSize: 12,
    bold: true,
    color: '#afc5d1',
    fillColor: '#24505c',
    font: 'Roboto',
  },
  tableCell: {
    fontSize: 10,
    color: '#24505c',
    font: 'Roboto',
  },
};

// Configuración por defecto
const defaultTableLayouts = {
  customLayout: {
    hLineWidth: () => 1,
    vLineWidth: () => 1,
    hLineColor: () => '#24505c',
    vLineColor: () => '#24505c',
    fillColor: () => '#24505c',
  },
};

// Agregar los logos como imágenes base64
const logos = {
  angular: '/assets/angular.svg',
  logo: '/assets/logo.svg',
  subLogo: '/assets/sub-logo.svg',
};

export { defaultStyles, defaultTableLayouts, logos };
export default pdfMake;
