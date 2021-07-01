import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Card } from '@material-ui/core';
import { useHistory } from 'react-router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  // Reset Router to Root Directory
  const routerHistory = useHistory();
  useEffect(() => {
    routerHistory.push('/');
  }, [routerHistory]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function AuthFormTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={`tabbed-auth-forms`}>
      <Card>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Login" className="auth-tab-btn" />
            <Tab label="Register" className="auth-tab-btn" />
          </Tabs>
        </AppBar>
        <div className="panels">
          <TabPanel value={value} index={0} >
            <LoginForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterForm />
          </TabPanel>
        </div>
      </Card>
    </div>
  );
}