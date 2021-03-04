import React, { useState, useCallback, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/actions/user';
import { Modal, Input } from 'antd';

type Props = {
	setShowAdminLogin: Function;
};

const AdminLogin = ({ setShowAdminLogin }: Props) => {
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const onChangePassword = (evt: ChangeEvent<HTMLInputElement>) => {
		setPassword(evt.target.value);
	};

	const handleOk = async () => {
		dispatch(login({ password }));
		setShowAdminLogin(false);
	};
	const handleCancel = useCallback(() => {
		setShowAdminLogin(false);
	}, []);

	return (
		<Modal title="관리자 로그인" visible onOk={handleOk} onCancel={handleCancel}>
			<Input type="password" value={password} onChange={onChangePassword} />
		</Modal>
	);
};

export default AdminLogin;
