"use client";
import React, { useEffect, useState } from "react";
import {
  GridCol,
  SimpleGrid,
  Grid,
  Avatar,
  Button,
  Group,
  Text,
  Paper,
  Tooltip,
  Anchor,
} from "@mantine/core";
import fetchGET from "./fetch";
import {
  IconPhoneCall,
  IconAt,
  IconWorld,
  IconUserPlus,
  IconTrash,
  IconUserMinus,
  IconStar,
} from "@tabler/icons-react";
import classes from "./page.module.css";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  isFollowed?: boolean;
}

export default function HomePage() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchGET("https://jsonplaceholder.typicode.com/users").then((users) =>
      setUsers(users as IUser[])
    );
  }, []);

  const handleFollowUser = (user: IUser, index: number) => {
    const userList = users;
    userList[index].isFollowed = !user.isFollowed;
    setUsers([...userList]);
  };

  const handleDelete = (index: number) => {
    const userList = users;
    userList.splice(index, 1);
    setUsers([...userList]);
  };

  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="lg" className={classes.grid}>
      {users.length &&
        users.map((user: IUser, index: number) => (
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Tooltip label={user.name} withArrow>
              <Avatar
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                size={120}
                radius={120}
                mx="auto"
                component="a"
                href={`https://${user.website}`}
              />
            </Tooltip>
            <Text ta="center" fz="lg" fw={500} mt="sm">
              {user.name}
              {user.isFollowed && <IconStar stroke={1.5} size="1rem" />}
            </Text>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="1rem" className={classes.icon} />
              <Anchor
                fz="xs"
                c="dimmed"
                href={`mailto:${user.email}`}
                underline="hover"
                target="_blank"
              >
                {user.email}
              </Anchor>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
              <IconPhoneCall
                stroke={1.5}
                size="1rem"
                className={classes.icon}
              />
              <Anchor
                fz="xs"
                c="dimmed"
                component="a"
                href={`tel:${user.phone}`}
                underline="hover"
              >
                {user.phone}
              </Anchor>
            </Group>
            <Group wrap="nowrap" gap={10} mt={5}>
              <IconWorld stroke={1.5} size="1rem" className={classes.icon} />
              <Anchor
                fz="xs"
                c="dimmed"
                component="a"
                href={`https://${user.website}`}
                underline="hover"
              >
                {user.website}
              </Anchor>
            </Group>
            <Grid>
              <GridCol span={6}>
                <Button
                  fullWidth
                  leftSection={
                    user.isFollowed ? (
                      <IconUserMinus
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    ) : (
                      <IconUserPlus style={{ width: "1rem", height: "1rem" }} />
                    )
                  }
                  radius="md"
                  mt="xl"
                  size="md"
                  variant={user.isFollowed ? "outline" : "filled"}
                  onClick={(e) => handleFollowUser(user, index)}
                >
                  {user.isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </GridCol>
              <GridCol span={6}>
                <Button
                  fullWidth
                  leftSection={
                    <IconTrash style={{ width: "1rem", height: "1rem" }} />
                  }
                  radius="md"
                  mt="xl"
                  size="md"
                  variant="outline"
                  onClick={(e) => handleDelete(index)}
                >
                  Delete
                </Button>
              </GridCol>
            </Grid>
          </Paper>
        ))}
    </SimpleGrid>
  );
}
