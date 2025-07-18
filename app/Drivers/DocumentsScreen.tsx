import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, spacing, typography } from '../Styles/theme';
import HamburgerMenu from './HamburgerMenu';

interface DocumentsScreenProps {
  // No navigation props needed for expo-router
}

const DocumentsScreen: React.FC<DocumentsScreenProps> = () => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleUploadDocument = (docType: string) => {
    Alert.alert('Subir Documento', `Subiendo ${docType}...`);
  };

  const handleViewDocument = (docType: string) => {
    Alert.alert('Ver Documento', `Abriendo ${docType}...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={toggleMenu}
        >
          <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Mis Documentos</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Status Overview */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <MaterialIcons name="verified" size={32} color={colors.success} />
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Estado de Documentos</Text>
              <Text style={styles.statusSubtitle}>4 de 5 documentos aprobados</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Required Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentos Requeridos</Text>
          
          {[
            {
              title: 'Licencia de Conducir',
              status: 'approved',
              expiry: '15/08/2025',
              icon: 'credit-card',
              color: colors.success
            },
            {
              title: 'Seguro del Vehículo',
              status: 'approved',
              expiry: '22/12/2024',
              icon: 'security',
              color: colors.success
            },
            {
              title: 'Registro del Vehículo',
              status: 'approved',
              expiry: '10/06/2025',
              icon: 'directions-car',
              color: colors.success
            },
            {
              title: 'Certificado Médico',
              status: 'pending',
              expiry: 'Pendiente',
              icon: 'local-hospital',
              color: colors.warning
            },
            {
              title: 'Antecedentes Penales',
              status: 'approved',
              expiry: '30/03/2025',
              icon: 'gavel',
              color: colors.success
            },
          ].map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <View style={styles.documentLeft}>
                <View style={[styles.documentIcon, { backgroundColor: doc.color }]}>
                  <MaterialIcons name={doc.icon as any} size={24} color="white" />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{doc.title}</Text>
                  <Text style={styles.documentExpiry}>
                    {doc.status === 'approved' ? `Vence: ${doc.expiry}` : doc.expiry}
                  </Text>
                </View>
              </View>
              
              <View style={styles.documentRight}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: doc.status === 'approved' ? colors.success : colors.warning }
                ]}>
                  <Text style={styles.statusText}>
                    {doc.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => doc.status === 'approved' 
                    ? handleViewDocument(doc.title)
                    : handleUploadDocument(doc.title)
                  }
                >
                  <MaterialIcons 
                    name={doc.status === 'approved' ? 'visibility' : 'upload'} 
                    size={20} 
                    color={colors.primary} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Optional Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentos Opcionales</Text>
          
          {[
            {
              title: 'Foto de Perfil',
              uploaded: true,
              icon: 'person',
              color: colors.info
            },
            {
              title: 'Foto del Vehículo',
              uploaded: true,
              icon: 'photo-camera',
              color: colors.info
            },
            {
              title: 'Comprobante de Domicilio',
              uploaded: false,
              icon: 'home',
              color: colors.textSecondary
            },
          ].map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <View style={styles.documentLeft}>
                <View style={[styles.documentIcon, { backgroundColor: doc.color }]}>
                  <MaterialIcons name={doc.icon as any} size={24} color="white" />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{doc.title}</Text>
                  <Text style={styles.documentExpiry}>
                    {doc.uploaded ? 'Subido' : 'No subido'}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => doc.uploaded 
                  ? handleViewDocument(doc.title)
                  : handleUploadDocument(doc.title)
                }
              >
                <MaterialIcons 
                  name={doc.uploaded ? 'visibility' : 'upload'} 
                  size={20} 
                  color={colors.primary} 
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <MaterialIcons name="info-outline" size={24} color={colors.info} />
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>¿Necesitas ayuda?</Text>
            <Text style={styles.helpText}>
              Si tienes problemas subiendo documentos o necesitas información sobre los requisitos, 
              contacta a nuestro equipo de soporte.
            </Text>
            <TouchableOpacity 
              style={styles.helpButton}
              onPress={() => router.push('/Drivers/SupportScreen')}
            >
              <Text style={styles.helpButtonText}>Contactar Soporte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Hamburger Menu Overlay */}
      <HamburgerMenu 
        isVisible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  backButton: {
    padding: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  statusTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  statusSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
  },
  section: {
    backgroundColor: colors.surface,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  documentExpiry: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  documentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    color: 'white',
    fontWeight: typography.weights.medium,
  },
  actionButton: {
    padding: spacing.sm,
  },
  helpSection: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    elevation: 2,
  },
  helpContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  helpTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  helpText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  helpButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    fontSize: typography.sizes.sm,
    color: 'white',
    fontWeight: typography.weights.medium,
  },
});

export default DocumentsScreen;