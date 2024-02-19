import { Box, Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import WorkIcon from "@mui/icons-material/Work";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import { useGeneral } from '@/contexts/GeneralContext';
import Skills from './skills/Skills';
import Experience from './experience/Experience';
import Education from './education/Education';
import Language from './language/Language';
import SkillsForm from './skills/SkillsForm';
import ExperienceForm from './experience/ExperienceForm';
import EducationForm from './education/EducationForm';
import LanguageForm from './language/LanguageForm';

const dummy = [
  {
    icon: LocalActivityIcon,
    title: "Istanbul, Turkey",
    scondary: "Add Location"
  },
  {
    icon: WorkIcon,
    title: "UX Designer on Twitter",
    scondary: "Add Job"
  }
]

interface ProfileSelectedProps {
  // Define props here
}

const ProfileSelected: React.FC<ProfileSelectedProps> = () => {
  //! States
      const {isMe, profilePage} = useGeneral()
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box sx={{borderRadius:'15px', backgroundColor:'white', padding:'20px'}} >
      {
          (() => {
            switch (profilePage) {
              case 0:
                return (
                  <Box sx={{ marginTop: '' }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                      Overview
                    </Typography>
  
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
                      {dummy.map((item, i) => (
                        item.title ? (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} key={i}>
                            <Box sx={{ display: 'flex', gap: '8px' }}>
                              {React.createElement(item.icon, { color: 'primary' })}
                              <Typography>
                                {item.title}
                              </Typography>
                            </Box>
                            {isMe && <ModeEditIcon sx={{ color: 'lightgray', cursor: 'pointer' }} />}
                          </Box>
                        ) : (
                          <Typography color='primary' fontWeight='bold' key={i}>
                            <AddIcon sx={{ transform: 'translateY(-1px)' }} color='primary' /> {item.scondary}
                          </Typography>
                        )
                      ))}
                    </Box>
  
                    <Skills />
                    <Experience />
                    <Education />
                    <Language />
                  </Box>
                );;
              case 1:
                return <SkillsForm />;
              case 2:
                return <ExperienceForm />;
              case 3:
                return <EducationForm />;
                case 4:
                  return <LanguageForm />;
            }
          })()
      }
    </Box>
  );
};

export default ProfileSelected;