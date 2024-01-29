import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Divider, MenuItem, MenuList, Paper } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./menu.module.css";

const Menu = () => {
  const [notification, setNotification] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState([]);

  const user = {
    name: "Alice",
    lastName: "Alexandra",
    country: "",
    email: "alicealx@gmail.com",
    _id: 3,
    avatar: "/src/assets/Alice.png",
  };

  useEffect(() => {
    if (user.avatar !== "" && user.country !== "") {
      setSteps([]);
      setProgress(6);
      setNotification(false);
    } else if (user.avatar === "") {
      setSteps(["Foto de perfil"]);
      setProgress(5);
    } else if (user.country === "") {
      setSteps(["País"]);
      setProgress(5);
    } else {
      setSteps(["País", "Foto de perfil"]);
      setProgress(4);
    }
  }, []);

  return (
    <header id={styles.menu}>
      <div className={styles.menu__logoLinks}>
        <div className={styles.menu__buttonIcon}>
          <label htmlFor="buttonIcon">
            <MenuIcon className={styles.menu__icon} />
          </label>
          <input type="checkbox" id={styles.buttonIcon} />
          <Paper className={styles.responsiveMenu}>
            <MenuList>
              <MenuItem>
                <Link to={"/meus-projetos"} className={styles.menu__link}>
                  Meus projetos
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/descobrir"} className={styles.menu__link}>
                  Descobrir
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <LogoutIcon />
                <span>&nbsp;</span>
                Sair
              </MenuItem>
            </MenuList>
          </Paper>
        </div>
        <img
          src="/imgs/Logo orange.png"
          alt="Logo Orange Portifólio"
          className={styles.menu__logo}
        />
        <ul className={styles.menu__links}>
          <li>
            <Link to={"/meus-projetos"} className={styles.menu__link}>
              Meus projetos
            </Link>
          </li>
          <li>
            <Link to={"/descobrir"} className={styles.menu__link}>
              Descobrir
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.menu__profileNotifications}>
        <Link to={"/perfil"}>
          <img
            src={user?.avatar}
            alt="Sua foto de perfil"
            className={styles.menu__profile}
          />
        </Link>
        <Badge
          badgeContent={notification ? 1 : null}
          onClick={() => setShowNotification(!showNotification)}
          sx={{
            "& .MuiBadge-badge": {
              color: "var(--white)",
              backgroundColor: "#FF5522",
            },
          }}
        >
          <NotificationsIcon
            sx={{
              color: "#FCFDFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
              cursor: "pointer",
            }}
          />
        </Badge>
        {showNotification && notification && (
          <Paper className={styles.menuNotification}>
            <div className={styles.triangulo}></div>
            <div className={styles.menuNotification__content}>
              <div className={styles.closeNotification}>
                <CloseIcon onClick={() => setNotification(false)} />
              </div>
              <Link to={"/perfil"} onClick={() => setShowNotification(false)}>
                <h3>Complete seu cadastro</h3>
                <div className={styles.containerProgress}>
                  <div
                    className={styles.progress}
                    style={{ width: (100 / 6) * progress + "%" }}
                  ></div>
                </div>
                <ul>
                  {steps?.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </Link>
            </div>
          </Paper>
        )}
      </div>
    </header>
  );
};

export default Menu;
