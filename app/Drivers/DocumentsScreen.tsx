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

interface DocumentsScreenProps {
  // No navigation props needed for expo-router
}

const DocumentsScreen: React.FC<DocumentsScreenProps> = () => {
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
        <View style={styles.backButton} />
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/HomeScreen')}
        >
          <MaterialIcons name="home" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/TripsScreen')}
        >
          <MaterialIcons name="directions-car" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Rutas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/EarningsScreen')}
        >
          <MaterialIcons name="local-taxi" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Unidad</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/DocumentsScreen')}
        >
          <MaterialIcons name="description" size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#20c997" }]}>Docs</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/ProfileScreen')}
        >
          <MaterialIcons name="person" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button for Incidents */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => router.push('/Incidents/IncidentsScreen')}
      >
        <MaterialIcons name="warning" size={28} color="white" />
      </TouchableOpacity>
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
  // Bottom Navigation Styles
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default DocumentsScreen;