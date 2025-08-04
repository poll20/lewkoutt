import React from 'react';
import { Check, Package, Truck, Clock, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

const OrderConfirmation = () => {
  const orderDetails = {
    orderId: "ORD-2025-0123",
    date: "15 Jan 2025",
    total: "₹2,499",
    items: [
      { name: "Wireless Bluetooth Headphones", price: "₹1,999", qty: 1 },
      { name: "Phone Case - Clear", price: "₹299", qty: 1 },
      { name: "Shipping", price: "₹99", qty: 1 },
      { name: "Tax", price: "₹102", qty: 1 }
    ],
    delivery: {
      address: "123, Green Park, New Delhi - 110016",
      expectedDate: "18 Jan 2025",
      time: "10:00 AM - 2:00 PM"
    },
    payment: {
      method: "Credit Card ****1234",
      status: "Paid"
    }
  };

  const orderSteps = [
    { label: "Order Placed", icon: Check, completed: true, active: false },
    { label: "Processing", icon: Package, completed: true, active: true },
    { label: "Shipped", icon: Truck, completed: false, active: false },
    { label: "Delivered", icon: Clock, completed: false, active: false }
  ];

  const styles = {
    container: {

      marginTop:"30px",
      minHeight: '100vh',
      backgroundColor: '#f0fdf4',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '16px'
    },
    wrapper: {
      maxWidth: '428px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center' ,
      padding: '32px 0'
    },
    successIcon: {
      width: '80px',
      height: '80px',
      backgroundColor: '#10B981',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#065f46',
      margin: '0 0 8px 0',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: '0',
      lineHeight: '1.5'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #f3f4f6'
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid #f3f4f6'
    },
    orderTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    orderDate: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0'
    },
    orderTotal: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#10B981'
    },
    itemRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      fontSize: '14px'
    },
    itemName: {
      color: '#374151',
      flex: 1
    },
    itemPrice: {
      color: '#111827',
      fontWeight: '500'
    },
    paymentInfo: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      marginTop: '16px'
    },
    paymentText: {
      margin: '0',
      fontSize: '14px',
      color: '#374151'
    },
    paymentStatus: {
      margin: '0',
      fontSize: '12px',
      color: '#10B981',
      fontWeight: '600'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 20px 0'
    },
    progressContainer: {
      position: 'relative' 
    },
    progressLine: {
      position: 'absolute' ,
      left: '16px',
      top: '16px',
      bottom: '16px',
      width: '2px',
      backgroundColor: '#e5e7eb'
    },
    progressFill: {
      width: '100%',
      height: '50%',
      backgroundColor: '#10B981',
      borderRadius: '1px'
    },
    stepRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '32px',
      position: 'relative' 
    },
    stepRowLast: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0',
      position: 'relative' 
    },
    stepIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px'
    },
    stepLabel: {
      margin: '0',
      fontSize: '14px',
      fontWeight: '500'
    },
    stepActive: {
      margin: '4px 0 0 0',
      fontSize: '12px',
      color: '#F97316',
      fontWeight: '500'
    },
    deliveryRow: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    deliveryText: {
      margin: '0',
      fontSize: '14px',
      color: '#374151',
      lineHeight: '1.5'
    },
    deliveryTime: {
      margin: '4px 0 0 0',
      fontSize: '12px',
      color: '#6b7280'
    },
    warningBox: {
      backgroundColor: '#fef3c7',
      border: '1px solid #fbbf24',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      alignItems: 'center'
    },
    warningText: {
      margin: '0',
      fontSize: '13px',
      color: '#92400e',
      fontWeight: '500'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column' ,
      gap: '12px'
    },
    primaryButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
    },
    secondaryButtonRow: {
      display: 'flex',
      gap: '12px'
    },
    secondaryButton: {
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    footer: {
      textAlign: 'center' ,
      padding: '32px 16px',
      marginTop: '24px'
    },
    footerText: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0',
      lineHeight: '1.5'
    },
    footerLink: {
      color: '#10B981',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Success Header */}
        <div style={styles.header}>
          <div style={styles.successIcon}>
            <Check size={40} color="white" strokeWidth={3} />
          </div>
          
          <h1 style={styles.title}>
            Order Confirmed!
          </h1>
          
          <p style={styles.subtitle}>
            Thank you for your order. We'll send you updates via email.
          </p>
        </div>

        {/* Order Summary Card */}
        <div style={styles.card}>
          <div style={styles.orderHeader}>
            <div>
              <h2 style={styles.orderTitle}>
                Order #{orderDetails.orderId}
              </h2>
              <p style={styles.orderDate}>
                Placed on {orderDetails.date}
              </p>
            </div>
            <div style={styles.orderTotal}>
              {orderDetails.total}
            </div>
          </div>

          {/* Order Items */}
          <div style={{ marginBottom: '20px' }}>
            {orderDetails.items.map((item, index) => (
              <div key={index} style={styles.itemRow}>
                <span style={styles.itemName}>
                  {item.name} {item.qty > 1 && `x${item.qty}`}
                </span>
                <span style={styles.itemPrice}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div style={styles.paymentInfo}>
            <CreditCard size={20} color="#10B981" style={{ marginRight: '12px' }} />
            <div>
              <p style={styles.paymentText}>
                {orderDetails.payment.method}
              </p>
              <p style={styles.paymentStatus}>
                {orderDetails.payment.status}
              </p>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            Order Status
          </h3>

          <div style={styles.progressContainer}>
            {/* Progress Line */}
            <div style={styles.progressLine}>
              <div style={styles.progressFill} />
            </div>

            {orderSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === orderSteps.length - 1;
              
              return (
                <div key={index} style={isLast ? styles.stepRowLast : styles.stepRow}>
                  <div style={{
                    ...styles.stepIcon,
                    backgroundColor: step.completed ? '#10B981' : step.active ? '#F97316' : '#e5e7eb'
                  }}>
                    <Icon size={16} color="white" />
                  </div>
                  <div>
                    <p style={{
                      ...styles.stepLabel,
                      fontWeight: step.active ? '600' : '500',
                      color: step.completed || step.active ? '#111827' : '#6b7280'
                    }}>
                      {step.label}
                    </p>
                    {step.active && (
                      <p style={styles.stepActive}>
                        In Progress
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Info */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            Delivery Information
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={styles.deliveryRow}>
              <MapPin size={18} color="#6b7280" style={{ marginRight: '12px', marginTop: '2px' }} />
              <div>
                <p style={styles.deliveryText}>
                  {orderDetails.delivery.address}
                </p>
              </div>
            </div>
            
            <div style={styles.deliveryRow}>
              <Clock size={18} color="#6b7280" style={{ marginRight: '12px' }} />
              <div>
                <p style={styles.deliveryText}>
                  Expected: {orderDetails.delivery.expectedDate}
                </p>
                <p style={styles.deliveryTime}>
                  {orderDetails.delivery.time}
                </p>
              </div>
            </div>
          </div>

          <div style={styles.warningBox}>
            <Package size={18} color="#d97706" style={{ marginRight: '8px' }} />
            <p style={styles.warningText}>
              Free delivery on orders above ₹1,999
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.primaryButton}>
            Track Your Order
          </button>

          <div style={styles.secondaryButtonRow}>
            <button style={styles.secondaryButton}>
              <Phone size={16} />
              Call Support
            </button>

            <button style={styles.secondaryButton}>
              <Mail size={16} />
              Email Us
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Need help? Contact us at{' '}
            <span style={styles.footerLink}>
              support@store.com
            </span>
            {' '}or call{' '}
            <span style={styles.footerLink}>
              1800-123-4567
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};


export default OrderConfirmation;